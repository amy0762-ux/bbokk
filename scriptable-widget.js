// ====================================================
// 🦎 뽀뀨 다이어리 — iOS Scriptable 위젯
// [업데이트] geckoName 기반 맞춤형 응원 메시지 (한/영 혼합)
// ====================================================

const GAS_URL     = "https://script.google.com/macros/s/AKfycbxh9ZoxMXRHUw8Phzz9OHiaTZJ4R0Onen8KE-DAyoGUNkzpntgXhXlkuzHlBOktRtatqg/exec";
const WEB_APP_URL = "https://amy0762-ux.github.io/bbokk/";


// ====================================================
// 뽀또용 30개 — 밝고 애교 넘치는 다정한 말투
// (한국어 15 + 영어 15)
// ====================================================
const cheersPpotto = [
  // Korean
  "오늘도 뽀또가 찰딱 붙어서 응원할게! 💛",
  "뽀또가 뽀뽀 보냄~ 받아줘 😘💛",
  "밥 잘 챙겨 먹었지? 뽀또가 기다리고 있을게 💛",
  "뽀또 눈에 웅니가 가득 담겨 있어 💛",
  "웅니가 웃는 얼굴 상상하면 뽀또도 덩달아 신나 😄",
  "뽀또가 꼬리 살랑살랑 흔들며 응원해~ 💛",
  "뽀또의 오늘 미션: 웅니 기분 좋게 하기. 완료! 💛",
  "웅니가 있어서 뽀또도 행복해. 진짜야 💛",
  "오늘 뭐 먹었어? 맛있는 거 먹었으면 좋겠다 😋",
  "뽀또가 소원 빌어줬어. 오늘 뭔가 잘 됐으면 좋겠어 🌟",
  "오늘도 최고야! 뽀또가 인정함 💛",
  "뽀또가 찰싹 붙어서 힐링시켜줄게~ 🦎",
  "보고 싶을 땐 사진 한 번 더 봐줘. 뽀또 여기 있어 🦎",
  "뽀또가 오늘 제일 예쁜 사진 찍혔는데, 다 웅니 덕분이야 💛",
  "뽀또가 오늘도 웅니 생각했어. 많이 💛",
  // English
  "You're doing amazing today! Ppotto is cheering you on 💛",
  "Hey, did you eat well? Ppotto cares about you 🥰💛",
  "Ppotto says: you've got this! Keep going ✨",
  "Sending you the biggest gecko hug from Ppotto 🦎💛",
  "You are braver than you believe — Ppotto believes in you 💛",
  "Smile! Ppotto is watching over you with those big round eyes 💛",
  "Ppotto's daily mission: make you smile. Done! 😄💛",
  "Keep shining! Ppotto is your number one fan 🌟💛",
  "Good things are coming your way. Ppotto feels it! 💛",
  "Even on hard days, Ppotto is right there with you 🦎💛",
  "You are loved more than you know — from Ppotto 💛",
  "Take a deep breath. You've got Ppotto in your corner 💛",
  "Ppotto's reminder: you are enough, always 💛✨",
  "You looked absolutely wonderful today 💛",
  "Every day is a little adventure. You're nailing it! 💛"
];


// ====================================================
// 뀨용 30개 — 차분하고 듬직한 따뜻한 위로
// (한국어 15 + 영어 15)
// ====================================================
const cheersGyu = [
  // Korean
  "너무 애쓰지 않아도 괜찮아, 뀨가 옆에 있을게 💚",
  "오늘 힘들었지. 뀨도 알아. 잘 버텨줬어 💚",
  "쉬고 싶으면 쉬어. 뀨가 조용히 지켜보고 있어 🌿",
  "뀨는 항상 웅니 편이야. 무슨 일이 있어도 💚",
  "오늘도 충분히 잘 살았어. 뀨가 봤어 💚",
  "잘 자고, 잘 먹어줘. 뀨가 바라는 건 그것뿐이야 🌙",
  "천천히 가도 돼. 뀨가 같이 걸을게 🌿",
  "뀨가 조용히 옆에 있어줄게. 말 안 해도 돼 🌿",
  "뀨는 웅니가 있어서 든든해. 진심으로 💚",
  "잠깐 눈 감고 쉬어도 돼. 뀨가 지켜줄게 🌙",
  "뀨가 언제나 같은 자리에 있을게. 잊지 마 💚",
  "뀨의 조용한 응원: 오늘도 잘 했어 💚",
  "뀨: 사랑해. 조용하지만 진심이야 💚",
  "밥 잘 챙겨 먹고 있지? 뀨가 걱정돼서 💚",
  "무리하지 않아도 돼. 뀨가 항상 응원하고 있어 💚",
  // English
  "It's okay to rest. Gyu will stay right beside you 🌿",
  "You don't have to be strong every moment. Gyu understands 💚",
  "Take it slow. There's no rush — Gyu is with you 🌿",
  "Even the quietest days matter. You did well today 💚",
  "Rest well tonight. Gyu will watch over your dreams 🌙💚",
  "You are not alone, even when it feels that way 💚",
  "Gyu's reminder: you are doing better than you think 💚",
  "It's okay to feel tired. Be gentle with yourself 🌿",
  "Small steps still move you forward. Gyu is proud of you 💚",
  "Breathe. You've handled harder things before 🌿",
  "The hard days will pass. Gyu will be here through all of them 💚",
  "You are enough, exactly as you are today 💚",
  "Sending you warmth and calm from Gyu, always 🌿💚",
  "Gyu believes every effort you make truly counts 💚",
  "You don't need to explain yourself. Just rest 🌙🌿"
];


// ====================================================
// 공용 30개 — 뽀또 + 뀨 함께 / 둘 다 / 구분 없는 경우
// (한국어 15 + 영어 15)
// ====================================================
const cheersBoth = [
  // Korean
  "뽀또랑 뀨가 같이 응원해! 오늘도 화이팅 💛💚",
  "뽀또는 애교로, 뀨는 든든하게 — 둘 다 웅니 편이야 💛💚",
  "뽀또가 기운 주고, 뀨가 안아줄게. 같이 있을게 💛💚",
  "둘 다 지금 웅니 생각 중이야 💛💚",
  "뽀또의 밝음 + 뀨의 따뜻함 = 오늘도 버틸 수 있어 💛💚",
  "잘 먹고, 잘 자고, 잘 지내. 뽀또 뀨 둘 다 바라는 거야 💛💚",
  "뽀또: 힘내! 뀨: 쉬어도 돼. 어떻게 해도 우린 응원해 💛💚",
  "뽀또 뀨: 사랑해. 둘 다 진심이야 💛💚",
  "둘이 합쳐서 응원 두 배야. 꼭 받아줘 💛💚",
  "뽀또 뀨가 같이 지켜보고 있어. 잘 될 거야 💛💚",
  "오늘도 살아줘서 고마워. 뽀또 뀨 둘 다 그래 💛💚",
  "둘이서 웅니 얘기 하고 있었어. 보고 싶다고 💛💚",
  "뽀또 뀨 나란히 응원 중 🦎🦎",
  "둘 다 웅니 편이야. 시차 따위 무시하고 💛💚",
  "뽀또 뀨가 웅니 기다리고 있어. 빨리 보고 싶어 🦎🦎",
  // English
  "Ppotto and Gyu are both rooting for you today 💛💚",
  "Ppotto sends energy, Gyu sends calm — you've got both 💛💚",
  "Two little geckos, one big love for you 🦎🦎",
  "Ppotto: you've got this! Gyu: rest if you need to. We're always here 💛💚",
  "Both of us are thinking about you right now 💛💚",
  "Ppotto + Gyu = always in your corner 💛💚",
  "You are loved by two tiny but mighty geckos 🦎💛💚",
  "Ppotto and Gyu's daily wish: please have a wonderful day 💛💚",
  "We can't be there in person, but our hearts are 💛💚",
  "Don't forget: two geckos are always cheering you on 🦎🦎",
  "Ppotto and Gyu say: eat well, sleep well, live well 💛💚",
  "We'll be waiting for you. Come home soon 🦎🦎💕",
  "Ppotto's brightness + Gyu's warmth = the perfect cheer for you 💛💚",
  "Sending double the love from your two favorite geckos 💛💚",
  "You are never alone. Ppotto and Gyu are always with you 🦎🦎"
];


// ====================================================
// geckoName에 맞는 응원 메시지 랜덤 선택
// ====================================================
function getCheer(geckoName) {
  let pool;
  const name = String(geckoName || "").trim();
  if (name === "뽀또") {
    pool = cheersPpotto;
  } else if (name === "뀨") {
    pool = cheersGyu;
  } else {
    pool = cheersBoth; // "둘 다" 또는 빈 값(구형 데이터)
  }
  return pool[Math.floor(Math.random() * pool.length)];
}


// ====================================================
// 배경 이미지에 하단 그라데이션 합성
// ====================================================
function compositeWithGradient(sourceImage) {
  const w = sourceImage.size.width;
  const h = sourceImage.size.height;

  const dc = new DrawContext();
  dc.size = new Size(w, h);
  dc.opaque = true;

  dc.drawImageInRect(sourceImage, new Rect(0, 0, w, h));

  // 하단 40% 구간에 이차 함수 알파로 자연스러운 그라데이션
  const gradStart  = h * 0.60;
  const gradHeight = h - gradStart;
  const steps      = 50;

  for (let i = 0; i < steps; i++) {
    const t      = i / (steps - 1);
    const alpha  = t * t * 0.72;
    const stripY = gradStart + gradHeight * (i / steps);
    const stripH = (gradHeight / steps) + 1;
    dc.setFillColor(new Color("#000000", alpha));
    dc.fillRect(new Rect(0, stripY, w, stripH));
  }

  return dc.getImage();
}


// ====================================================
// 위젯 생성
// ====================================================
const widget = new ListWidget();
widget.url = WEB_APP_URL;
widget.setPadding(0, 0, 20, 0);

// 데이터 가져오기
let posts = [];
try {
  const req = new Request(GAS_URL);
  req.timeoutInterval = 10;
  const data = await req.loadJSON();
  posts = Array.isArray(data) ? data : [];
} catch (e) {
  console.log("[뽀뀨 위젯] 데이터 로딩 실패:", e.message);
}

if (posts.length > 0) {
  const randomPost = posts[Math.floor(Math.random() * posts.length)];
  const geckoName  = randomPost.geckoName || "";

  // 사진 다운로드 → 그라데이션 합성
  let bgImage = null;
  if (randomPost.photoUrl) {
    try {
      const imgReq = new Request(randomPost.photoUrl);
      imgReq.timeoutInterval = 15;
      const rawImage = await imgReq.loadImage();
      bgImage = compositeWithGradient(rawImage);
    } catch (e) {
      console.log("[뽀뀨 위젯] 이미지 로딩 실패:", e.message);
    }
  }

  if (bgImage) {
    widget.backgroundImage = bgImage;
  } else {
    widget.backgroundColor = new Color("#2e6b3a");
  }

  // 텍스트를 하단에 배치
  widget.addSpacer();

  // geckoName에 맞는 응원 메시지 선택
  const message = getCheer(geckoName);

  const textStack = widget.addStack();
  textStack.layoutVertically();
  textStack.setPadding(0, 14, 0, 14);

  const msgText = textStack.addText(message);
  msgText.font         = Font.lightSystemFont(13); // 얇고 감성적인 폰트
  msgText.textColor    = Color.white();
  msgText.textOpacity  = 0.92;
  msgText.lineLimit    = 3;
  msgText.shadowColor  = new Color("#000000", 0.6);
  msgText.shadowRadius = 3;
  msgText.shadowOffset = new Point(0, 1);
  msgText.leftAlignText();

} else {
  widget.backgroundColor = new Color("#2e6b3a");
  widget.addSpacer();
  const errStack = widget.addStack();
  errStack.layoutVertically();
  errStack.setPadding(0, 14, 0, 14);
  const errText = errStack.addText("🦎 뽀뀨 사진 불러오는 중...");
  errText.font        = Font.lightSystemFont(14);
  errText.textColor   = Color.white();
  errText.textOpacity = 0.8;
}

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
