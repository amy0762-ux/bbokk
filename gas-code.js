// ====================================================
// 뽀뀨 다이어리 — Google Apps Script (GAS)
// ====================================================

var SPREADSHEET_ID = "1Mce0jjr0i54WO4aL_Q4pY3S4RmNU2ezJZw4-9Ijzbl0";
var SHEET_NAME = "시트1";
var FOLDER_ID = "1e0bct-dEkct64mT_eUHEvGFPTPj1BiND";
var TELEGRAM_TOKEN = "8452923975:AAHUMsA4UoVp29Y4LTlDeQ9umnGtMYqbB44";
var TELEGRAM_CHAT_ID = "8658056290";
var WEB_APP_URL = "https://github.com/amy0762-ux/bbokk";

// ====================================================
// [doPost] 앱 → GAS: 사진 배열 업로드
// payload: { photos: [{ image: base64, mimeType, fileName, comment, geckoName }] }
// ====================================================
function doPost(e) {
  try {
    Logger.log("param.data len=" + ((e.parameter && e.parameter.data) ? e.parameter.data.length : 0) + " postData=" + (e.postData ? "yes" : "no"));
    var raw = (e.parameter && e.parameter.data)
      ? e.parameter.data.replace(/ /g, '+')
      : (e.postData ? e.postData.contents : "{}");
    var payload = JSON.parse(raw);
    var photos = Array.isArray(payload.photos) ? payload.photos : [];
    if (photos.length === 0) return buildResponse({ error: "photos 배열 비어 있음" });

    var folder = DriveApp.getFolderById(FOLDER_ID);
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    var count = 0;
    for (var i = 0; i < photos.length; i++) {
      var p = photos[i];
      var bytes = Utilities.base64Decode(p.image);
      var blob = Utilities.newBlob(bytes, p.mimeType || "image/jpeg", p.fileName || ("photo_" + Date.now() + ".jpg"));
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      var photoUrl = "https://drive.google.com/uc?export=view&id=" + file.getId();
      sheet.appendRow([new Date(), p.comment || "", photoUrl, p.geckoName || ""]);
      sendTelegramNotification(p.geckoName || "둘 다", p.comment || "");
      count++;
    }

    return buildResponse({ success: true, count: count });

  } catch (err) {
    return buildResponse({ error: err.toString() });
  }
}

// ====================================================
// [텔레그램] 사진 업로드 알림
// ====================================================
function sendTelegramNotification(geckoName, comment) {
  var msgs = {
    "뽀또": [
      "웅니! Just checking in on you! 🦎 오늘도 무사히 잘 보내고 있어?",
      "Keep your head up, Sis! 뽀또가 웅니의 하루를 응원해. ✨",
      "웅니, 호주 생활은 어때? I'm always on your side. 뽀또가 옆에 있을게! ❤️",
      "Slow and steady wins the race. 뽀또처럼 천천히, 하지만 확실하게 가보자! 🐾",
      "Everything will be fine. 웅니는 뽀또의 자랑이야! 🌟",
      "Hey Ung-ni! Take a deep breath. 내 사진 보고 잠시 쉬어가기! 🌿",
      "You're doing better than you think. 웅니가 최고야! 💪",
      "웅니! You're the most precious person to me. 뽀또가 사랑해! ✨",
      "웅니, 뽀또랑 같이 긍정 에너지 충전! Let's stay positive! 🌈",
      "오늘 하루도 고생 많았어 웅니. You deserve the best! 💐"
    ],
    "뀨": [
      "웅니웅니! Guess what? 뀨가 웅니 주려고 에너지를 가득 모아왔지! ⚡️",
      "Hey Sis! Go get 'em! 오늘 하루도 웅니가 주인공이야! 얍!! 🥊",
      "웅니! You're the best! 뀨는 웅니가 세상에서 제일 멋있어! 🌟",
      "Look at me, Ung-ni! 내 귀여움 받고 힘내서 열공하기! 📖",
      "뀨 등장! Don't let anything get you down. 웅니는 천하무적! 🛡️",
      "Hi Sis! Don't forget to smile. 뀨처럼 귀엽게 웃어봐! 🦎",
      "웅니! Make it happen! 웅니가 원하는 건 다 이뤄질 거야! ✨",
      "You've got this, Ung-ni! 뀨만 믿고 당당하게 가보자고! 🚀",
      "웅니, 호주에서 제일 빛나는 사람이 될 거야! Shine like a star! 💎",
      "Hey! Cheer up! 뀨가 멀리 호주까지 사랑을 보낼게! 퓽~ 💕"
    ],
    "공통": [
      "웅니!! 뽀또랑 뀨가 같이 왔어!! 🦎🦎 We miss you so much!",
      "Stay strong, Ung-ni! 우리가 기운 팍팍 보내줄게! ⚡️",
      "웅니를 위해 우리 사진을 선물로 준비했어! Open your present! 📸",
      "Everything's going to be alright. 우리가 웅니 곁에 있다는 거 잊지 마! ✨",
      "웅니! You are our sunshine! 웅니가 행복해야 우리도 행복해! ☀️"
    ]
  };

  var targetList = (geckoName === "뽀또") ? msgs["뽀또"]
    : (geckoName === "뀨") ? msgs["뀨"]
      : msgs["공통"];

  var pickedMessage = targetList[Math.floor(Math.random() * targetList.length)];
  var text = "✨ " + pickedMessage
    + (comment ? '\n\n💬 "' + comment + '"' : "")
    + "\n\n👇 Click below to see me!";

  UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
    {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        reply_markup: { inline_keyboard: [[{ text: "📸 See My Photo", url: WEB_APP_URL }]] }
      })
    }
  );
}


function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      return buildResponse({ posts: [], total: 0, offset: 0, limit: 20 });
    }

    // A~D열 (타임스탬프 / 코멘트 / 사진링크 / 주인공) 읽기
    var range = sheet.getRange(2, 1, lastRow - 1, 4);
    var values = range.getValues();

    var posts = [];
    for (var i = 0; i < values.length; i++) {
      var row = values[i];

      // 타임스탬프 없는 행 건너뜀
      if (!row[0]) continue;

      var timestamp = row[0]; // A열: 타임스탬프
      var comment = row[1]; // B열: 코멘트
      var photoUrl = row[2]; // C열: 사진 링크
      var geckoName = row[3]; // D열: 주인공 (뽀또 / 뀨 / 둘 다)

      var directUrl = convertToDirect(String(photoUrl));

      posts.push({
        timestamp: formatDate(timestamp),
        _ts: new Date(timestamp).getTime(),
        comment: String(comment || ""),
        photoUrl: directUrl || "",
        geckoName: String(geckoName || "")
      });
    }

    // 타임스탬프 기준 최신 순 정렬
    posts.sort(function (a, b) {
      return b._ts - a._ts;
    });

    // 페이지네이션
    var limit = parseInt((e.parameter && e.parameter.limit) || 20, 10);
    var offset = parseInt((e.parameter && e.parameter.offset) || 0, 10);
    var total = posts.length;
    var page = posts.slice(offset, offset + limit);

    return buildResponse({ posts: page, total: total, offset: offset, limit: limit });

  } catch (err) {
    return buildResponse({ error: err.toString() });
  }
}


// ====================================================
// [함수 1] 구글 드라이브 URL → 다이렉트 이미지 URL 변환
// ====================================================
function convertToDirect(url) {
  if (!url) return "";

  // 형식 1: /file/d/FILE_ID/view → uc export
  var match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    return "https://drive.google.com/uc?export=view&id=" + match1[1];
  }

  // 형식 2: lh3.googleusercontent.com/d/FILE_ID → uc export
  var match2 = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (match2) {
    return "https://drive.google.com/uc?export=view&id=" + match2[1];
  }

  // 이미 uc?export 형식이면 그대로
  return url;
}


// ====================================================
// [함수 2] 날짜 포맷 변환
// ====================================================
function formatDate(dateObj) {
  if (!dateObj) return "";
  try {
    var d = new Date(dateObj);
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    var hour = String(d.getHours()).padStart(2, "0");
    var min = String(d.getMinutes()).padStart(2, "0");
    return year + "." + month + "." + day + " " + hour + ":" + min;
  } catch (e) {
    return String(dateObj);
  }
}


// ====================================================
// [함수 3] CORS 헤더 포함 JSON 응답 생성
// ====================================================
function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
