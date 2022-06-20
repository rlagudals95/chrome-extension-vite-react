try {
  chrome.devtools.panels.create(
    "Dev Tools",
    "icon-34.png",
    "src/pages/popup/Popup.tsx"
  );
} catch (e) {
  console.error(e);
}
