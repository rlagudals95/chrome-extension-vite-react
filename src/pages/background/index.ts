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

function start(tab) {
  //chrome.tabs.executeScript(tab.id, {code: 'document.body.scrollTop = document.documentElement.scrollTop = 0;'});
  /* Google search gave me this answer:
    window.scrollTo(0,document.body.scrollHeight);
    Where you have nested elements, the document might not scroll. In this case, you need to target the element that scrolls and use it's scroll height instead.

    window.scrollTo(0,document.querySelector(".scrollingContainer").scrollHeight);

    You can tie that to the onclick event of your question (i.e. <div onclick="ScrollToBottom()" ...).

    Some additional sources you can take a look at:

    http://www.sourcetricks.com/2010/07/javascript-scroll-to-bottom-of-page.html
    http://www.alecjacobson.com/weblog/?p=753
    http://www.mediacollege.com/internet/javascript/page/scroll.html
    http://www.electrictoolbox.com/jquery-scroll-bottom/*/
  chrome.tabs.executeScript(tab.id, {
    code: "window.scroll(0, document.body.scrollHeight);",
  });
}


// Set up a click handler so that we can merge all the windows.

// chrome.action.onClicked.addListener((tab) => {
//   start;
// });

// chrome.action.onClicked.addListener((tab) => {
//   chrome.tabs.create({ url: "https://www.youtube.com" });
// });
