// ====================================================
// 뽀뀨 일기 — Service Worker (PWA 오프라인 지원)
// ====================================================

const CACHE_NAME = 'ppokku-v1';

// 앱 실행에 꼭 필요한 핵심 파일들을 미리 캐싱
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// ── 설치: 핵심 파일 미리 캐시 ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // 설치 즉시 활성화 (기존 SW 대기 없이)
  self.skipWaiting();
});

// ── 활성화: 오래된 캐시 삭제 ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // 즉시 모든 탭에 적용
  self.clients.claim();
});

// ── 요청 가로채기: 캐시 우선 전략 ──
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 구글 서버 요청(GAS API, 드라이브 이미지)은 항상 네트워크에서 가져옴
  // (사진은 항상 최신 것을 보여줘야 하기 때문)
  if (
    url.hostname.includes('script.google.com') ||
    url.hostname.includes('googleusercontent.com') ||
    url.hostname.includes('drive.google.com')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 나머지 요청: 캐시에 있으면 캐시, 없으면 네트워크
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // 유효한 응답만 캐시에 저장
        if (response && response.status === 200 && response.type === 'basic') {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, toCache);
          });
        }
        return response;
      }).catch(() => {
        // 오프라인이고 캐시도 없을 때 → 기본 페이지 반환
        return caches.match('/index.html');
      });
    })
  );
});
