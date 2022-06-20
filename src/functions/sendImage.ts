import { bglog } from "./utils";

export type extractType =
  | "image"
  | "thumbnail"
  | "imageTagImg"
  | "detailImages"
  | "productName"
  | "imgTagImg"
  | null;

const detailImageSize = {
  alibaba: 790,
  taobao: 750,
  tmall: 750,
};

export const sendImage = () => {
  // Source: https://support.google.com/webmasters/answer/2598805?hl=en
  const imageUrlRegex =
    /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:bmp|gif|ico|jfif|jpe?g|png|svg|tiff?|webp))(?:\?([^#]*))?(?:#(.*))?/i;

  function extractImagesFromSelector(
    selector: string,
    extractType?: extractType
  ) {
    let extractFunc; // TODO 썸네일 상세 페이지 추출 함수 조건 할당

    if (extractType === "detailImages") {
      extractFunc = extractDetailImageFromElement;
    } else if (extractType === "thumbnail") {
      extractFunc = extractThumbnailImageFromElement;
    } else if (extractType === "imageTagImg") {
      extractFunc = extractImageFromImgElement;
    } else {
      extractFunc = extractImageFromElement;
    }
    return unique(
      toArray(document.querySelectorAll(selector))
        .map(extractFunc)
        .filter(isTruthy)
        .map(relativeUrlToAbsolute)
    );
  }

  const extractProductName = () => {
    extractImagesFromSelector("img, image", "productName");
  };

  const extractThumbnail = () => {
    return "thumbnail";
  };

  function extractImageFromElement(element?: any) {
    if (element.tagName.toLowerCase() === "img") {
      const src = element.src
        ? element.src
        : element.getAttribute("data-lazyload-src");
      const hashIndex = src.indexOf("#");

      return hashIndex >= 0 ? src.substr(0, hashIndex) : src;
    }

    if (element.tagName.toLowerCase() === "image") {
      const src = element.getAttribute("xlink:href");
      const hashIndex = src.indexOf("#");
      return hashIndex >= 0 ? src.substr(0, hashIndex) : src;
    }

    if (element.tagName.toLowerCase() === "a") {
      const href = element.href;
      if (isImageURL(href)) {
        return href;
      }
    }

    const backgroundImage = window.getComputedStyle(element).backgroundImage;
    if (backgroundImage) {
      const parsedURL = extractURLFromStyle(backgroundImage);
      if (isImageURL(parsedURL)) {
        return parsedURL;
      }
    }
  }

  function extractImageFromImgElement(element?: any) {
    // extract thumbnail

    if (element.tagName.toLowerCase() === "img") {
      const src = element.src;
      const hashIndex = src.indexOf("#");

      return hashIndex >= 0 ? src.substr(0, hashIndex) : src;
    }
  }

  // 썸네일 + 상세이미지
  function extractDetailImageFromElement(element?: any) {
    // extract detail
    const src = element.src
      ? element.src
      : element.getAttribute("data-lazyload-src");

    const imgWidth = element.naturalWidth
      ? element.naturalWidth
      : element.width;
    const imgHeight = element.naturalHeight
      ? element.naturalHeight
      : element.height;

    if (element.tagName.toLowerCase() === "img") {
      // 링크 이미지 제외
      if (element.getAttribute("data-src") && !src) {
        return element.getAttribute("data-src");
      }

      if (element.parentNode.tagName.toLowerCase() === "a") {
        return;
      }

      const hashIndex = src.indexOf("#");
      // TODO 중복제거
      if (imgWidth > 390 && imgWidth < 1300 && imgHeight > 100) {
        return hashIndex >= 0 ? src.substr(0, hashIndex) : src;
      }
    }
  }

  function extractThumbnailImageFromElement(element?: any) {
    // extract detail

    if (element.tagName.toLowerCase() === "img") {
      const src = element.src;
      const hashIndex = src.indexOf("#");
      const imgWidth = element.width;
      const imgHeight = element.height;

      if (
        src &&
        imgWidth === imgHeight &&
        imgWidth > 300 &&
        imgHeight > 300 &&
        imgWidth < 1000
      ) {
        return hashIndex >= 0 ? src.substr(0, hashIndex) : src;
      }
    }
  }

  function isImageURL(url: string) {
    return url.indexOf("data:image") === 0 || imageUrlRegex.test(url);
  }

  function extractURLFromStyle(style: string) {
    return style.replace(/^.*url\(["']?/, "").replace(/["']?\).*$/, "");
  }

  function relativeUrlToAbsolute(url?: any) {
    return url.indexOf("/") === 0 ? `${window.location.origin}${url}` : url;
  }

  function unique(values: Array<any>) {
    return toArray(new Set(values));
  }

  function toArray(values: any) {
    return [...values];
  }

  // 빈 값 체크
  function isTruthy(value: any) {
    return !!value;
  }

  // const uniqueArr = (imgurl:string) => {
  //   const imgUrlArr = imgurl.split("/");

  //   let uniqueArr = [];
  //   imgUrlArr.forEach((element: any) => {
  //     if (!uniqueArr.includes(element)) {
  //       uniqueArr.push(element);
  //     }
  //   });

  //   return uniqueArr;
  // };

  // const uniqueArr = dupArr.filter((element, index) => {
  //   return dupArr.indexOf(element) === index;
  // });

  // const imgUrlArr = src.split("/");
  // console.log('마지막 url',imgUrlArr[imgUrlArr.length - 2]);

  chrome.runtime.sendMessage({
    type: "sendImages",
    //allImages: extractImagesFromSelector("img, image, a, [class], [style]"),
    allImages: extractImagesFromSelector(
      "img, image, a, [class], [style]",
      "detailImages"
    ),
    linkedImages: extractImagesFromSelector("a"),
    imgTagImage: extractImagesFromSelector("img", "imageTagImg"),
    thumbnail: extractImagesFromSelector("img", "thumbnail"),
    origin: window.location.origin,
    detailImages: extractImagesFromSelector(
      "img, image, a, [class], [style]",
      "detailImages"
    ),
  });
};
