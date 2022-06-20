import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { isIncludedIn, unique } from "../../functions/utils";
import { useRunAfterUpdate } from "../../hooks/useRunAfterUpdate";
import { DownloadButton } from "@src/components/DownloadButton";
import * as actions from "../../functions/actions";
import { sendImage } from "../../functions/sendImage";
import { Images } from "../../functions/Images";
import { bglog } from "../../functions/utils";
import styled from "styled-components";
import { DownloadConfirmation } from "@src/components/DownloadConfirmation";
import "../../style/main.css";

const initialOptions = localStorage;

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [options, setOptions] = useState(initialOptions);
  const [userInfo, setUserInfo] = useState("유저인포");

  useEffect(() => {
    const test = localStorage.getItem("lastExpandableTipsOpenTime") as string;
    setUserInfo(test);
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  // getImaeges
  const [thumbnail, setThumbnail] = useState<any>([]);
  const [allImages, setAllImages] = useState<any>([]);
  const [detailImages, setDetailImages] = useState<any>([]);
  const [linkedImages, setLinkedImages] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState<any>([]);
  const [imgTagImage, setImgTagImage] = useState<any>([]);

  useEffect(() => {
    const updatePopupData = (message: any) => {
      if (message.type !== "sendImages") return;

      setVisibleImages((allImages: any) =>
        unique([...allImages, ...message.allImages])
      );

      setAllImages((allImages: any) =>
        unique([...allImages, ...message.allImages])
      );

      setImgTagImage((imgTagImage: any) =>
        unique([...imgTagImage, ...message.imgTagImage])
      );

      setDetailImages((detailImages: any) =>
        unique([...detailImages, ...message.detailImages])
      );
      // 썸네일 후보군으로 나누기..?
      setThumbnail(unique([message.thumbnail[0]]));

      setLinkedImages((linkedImages: any) =>
        unique([...linkedImages, ...message.linkedImages])
      );

      localStorage.active_tab_origin = message.origin;
    };

    // Add images to state and trigger filtration.
    // `sendImages.js` is injected into all frames of the active tab, so this listener may be called multiple times.
    chrome.runtime.onMessage.addListener(updatePopupData);

    // Get images on the page
    chrome.windows.getCurrent((currentWindow) => {
      chrome.tabs.query(
        { active: true, windowId: currentWindow.id },
        (activeTabs: any) => {
          chrome.scripting.executeScript({
            target: { tabId: activeTabs[0].id },
            func: sendImage,
          });
        }
      );
    });

    return () => {
      chrome.runtime.onMessage.removeListener(updatePopupData);
    };
  }, [allImages]);

  //
  const imagesCacheRef = useRef<any>(); // Not displayed; only used for filtering by natural width / height
  const filterImages = useCallback(() => {
    let visibleImages =
      options.only_images_from_links === "true" ? linkedImages : allImages;

    let filterValue = options.filter_url;
    if (filterValue) {
      switch (options.filter_url_mode) {
        case "normal":
          const terms = filterValue.split(/\s+/);
          visibleImages = visibleImages.filter((url: string) => {
            for (let index = 0; index < terms.length; index++) {
              let term = terms[index];
              if (term.length !== 0) {
                const expected = term[0] !== "-";
                if (!expected) {
                  term = term.substr(1);
                  if (term.length === 0) {
                    continue;
                  }
                }
                const found = url.indexOf(term) !== -1;
                if (found !== expected) {
                  return false;
                }
              }
            }
            return true;
          });
          break;
          // case "wildcard":
          filterValue = filterValue
            .replace(/([.^$[\]\\(){}|-])/g, "\\$1")
            .replace(/([?*+])/, ".$1");
        /* fall through */
        case "regex":
          visibleImages = visibleImages.filter((url: string) => {
            try {
              return url.match(filterValue);
            } catch (error) {
              return false;
            }
          });
          break;
      }
    }

    visibleImages = visibleImages.filter((url: string) => {
      const imageRefCurrent = imagesCacheRef?.current;
      const image = imageRefCurrent?.querySelector(
        `img[src="${encodeURI(url)}"]`
      );

      return (
        (options.filter_min_width_enabled !== "true" ||
          options.filter_min_width <= image.naturalWidth) &&
        (options.filter_max_width_enabled !== "true" ||
          image.naturalWidth <= options.filter_max_width) &&
        (options.filter_min_height_enabled !== "true" ||
          options.filter_min_height <= image.naturalHeight) &&
        (options.filter_max_height_enabled !== "true" ||
          image.naturalHeight <= options.filter_max_height)
      );
    });

    setVisibleImages(visibleImages);
  }, [allImages, linkedImages, options]);

  useEffect(filterImages, [allImages, linkedImages, options]);

  const [downloadIsInProgress, setDownloadIsInProgress] = useState(false);
  const imagesToDownload = useMemo(
    () => visibleImages.filter(isIncludedIn(selectedImages)),
    [visibleImages, selectedImages]
  );

  const [downloadConfirmationIsShown, setDownloadConfirmationIsShown] =
    useState(false);

  function maybeDownloadImages() {
    if (options.show_download_confirmation === "true") {
      setDownloadConfirmationIsShown(true);
    } else {
      downloadImages();
    }
  }

  async function downloadImages() {
    setDownloadIsInProgress(true);
    await actions.downloadImages(imagesToDownload, options);
    setDownloadIsInProgress(false);
  }

  // TODO 클라우드 업로드 함수

  const runAfterUpdate = useRunAfterUpdate();

  return (
    <>
      <DownloadButton
        disabled={imagesToDownload.length === 0}
        loading={downloadIsInProgress}
        onClick={maybeDownloadImages}
      />

      {downloadConfirmationIsShown && (
        <>
          <DownloadConfirmation
            style={""}
            onCheckboxChange={({ currentTarget: { checked } }) => {
              setOptions((options) => ({
                ...options,
                show_download_confirmation: (!checked).toString(),
              }));
            }}
            onClose={() => setDownloadConfirmationIsShown(false)}
            onConfirm={downloadImages}
          />
        </>
      )}

      <Images
        options={options}
        thumbnail={thumbnail}
        visibleImages={visibleImages}
        setImgTagImage={setImgTagImage}
        detailImages={detailImages}
        selectedImages={selectedImages}
        imagesToDownload={imagesToDownload}
        setSelectedImages={setSelectedImages}
        style={undefined}
        checked={false}
      />
      {/* <button onClick={changeBackground}>change background</button> */}
    </>
  );
};

export default Popup;

const Container = styled.div``;