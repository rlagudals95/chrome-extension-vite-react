import { bglog } from "./utils";

export const downloadImages = (imagesToDownload: any, options: any) => {
  return new Promise((resolve) => {
    console.log("imagesToDownload :", imagesToDownload);
    bglog(imagesToDownload);
    chrome.runtime.sendMessage(
      { type: "downloadImages", imagesToDownload, options },
      resolve
    );
  });
};
