// ====================================================
// 📷 뽀뀨 다이어리 — 사진 올리기 위젯 (유리용)
// 탭하면 바로 업로드 창으로 이동
// ====================================================

const WEB_APP_UPLOAD_URL = "https://amy0762-ux.github.io/bbokk/#upload";

const widget = new ListWidget();
widget.url = WEB_APP_UPLOAD_URL;
widget.backgroundColor = new Color("#2e6b3a");
widget.setPadding(16, 16, 16, 16);

// 상단 이모지
const emojiText = widget.addText("📷");
emojiText.font = Font.systemFont(32);
emojiText.centerAlignText();

widget.addSpacer(8);

// 메인 텍스트
const mainText = widget.addText("사진 올리기");
mainText.font = Font.boldSystemFont(15);
mainText.textColor = Color.white();
mainText.centerAlignText();

widget.addSpacer(4);

// 서브 텍스트
const subText = widget.addText("뽀또 & 뀨에게 보내기");
subText.font = Font.lightSystemFont(11);
subText.textColor = new Color("#ffffff", 0.7);
subText.centerAlignText();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
