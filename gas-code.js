// ====================================================
// 뽀뀨 다이어리 — Google Apps Script (GAS)
// [업데이트] doPost 추가 — 앱에서 직접 사진 업로드 지원
// ====================================================

// ====================================================
// [doPost] 앱 → GAS: 사진 배열 업로드
// payload: { photos: [{ image: base64, mimeType, fileName, comment, geckoName }] }
// ====================================================
function doPost(e) {
  try {
    var SPREADSHEET_ID = "1Mce0jjr0i54WO4aL_Q4pY3S4RmNU2ezJZw4-9Ijzbl0"; // ★ doGet과 동일하게
    var SHEET_NAME = "시트1";
    var FOLDER_ID = "1e0bct-dEkct64mT_eUHEvGFPTPj1BiND"; // ★ 사진 저장할 Drive 폴더 ID

    Logger.log("param.data len=" + ((e.parameter && e.parameter.data) ? e.parameter.data.length : 0) + " postData=" + (e.postData ? "yes" : "no"));
    var raw = (e.parameter && e.parameter.data) ? e.parameter.data : (e.postData ? e.postData.contents : "{}");
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
      var photoUrl = "https://lh3.googleusercontent.com/d/" + file.getId();
      sheet.appendRow([new Date(), p.comment || "", photoUrl, p.geckoName || ""]);
      count++;
    }

    return buildResponse({ success: true, count: count });

  } catch (err) {
    return buildResponse({ error: err.toString() });
  }
}


function doGet(e) {
  try {
    // ★ 본인의 구글 스프레드시트 ID로 교체하세요
    var SPREADSHEET_ID = "1Mce0jjr0i54WO4aL_Q4pY3S4RmNU2ezJZw4-9Ijzbl0";
    var SHEET_NAME = "시트1";

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      return buildResponse([]);
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
      return new Date(b._ts) - new Date(a._ts);
    });

    return buildResponse(posts);

  } catch (err) {
    return buildResponse({ error: err.toString() });
  }
}


// ====================================================
// [함수 1] 구글 드라이브 URL → 다이렉트 이미지 URL 변환
// ====================================================
function convertToDirect(url) {
  if (!url) return "";

  // 형식 1: /file/d/FILE_ID/view
  var match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    return "https://lh3.googleusercontent.com/d/" + match1[1];
  }

  // 형식 2: ?id=FILE_ID 또는 &id=FILE_ID
  var match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) {
    return "https://lh3.googleusercontent.com/d/" + match2[1];
  }

  // 형식 3: /uc?export=...&id=FILE_ID
  var match3 = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (match3) {
    return "https://lh3.googleusercontent.com/d/" + match3[1];
  }

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
