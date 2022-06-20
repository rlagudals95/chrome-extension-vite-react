console.log("background loaded2222");

var onMessageListener = function (
  message: any,
  sender: any,
  sendResponse: any
) {
  switch (message.type) {
    case "bglog":
      console.log(message.obj);
      break;
  }
  return true;
};
chrome.runtime.onMessage.addListener(onMessageListener);

// function start() {
//   chrome.tabs.executeScript({
//     code: "window.scroll(0, document.body.scrollHeight);",
//   });
// }

// start();
