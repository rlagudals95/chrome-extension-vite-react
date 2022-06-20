import React, { useMemo, useState } from "react";
import CheckBoxV2 from "@src/components/CheckBoxV2";
import { Checkbox } from "@src/components/Checkbox";

import { extractType } from "./sendImage";
import {
  isIncludedIn,
  isNotStrictEqual,
  stopPropagation,
} from "../functions/utils";
import "../style/main.css";

import {
  DownloadImageButton,
  ImageUrlTextbox,
  OpenImageButton,
} from "./ImageActions";

interface IProps {
  options: any;
  thumbnail: any;
  visibleImages: any;
  setImgTagImage: any;
  detailImages: any;
  selectedImages: any;
  imagesToDownload: any;
  setSelectedImages: any;
  style: any;
  checked: boolean;
}

export const Images = (props: IProps) => {
  const {
    options,
    visibleImages,
    detailImages,
    selectedImages,
    thumbnail,
    imagesToDownload,
    setImgTagImage,
    setSelectedImages,
    style,
    checked,
  }: IProps = props;

  const [extractType, setExtractType] = useState<extractType>("image");
  const [isChecked, setIsChecked] = useState(false);

  const containerStyle = useMemo(() => {
    const columns = parseInt(options.columns, 10);
    return {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      width: `calc(2 * var(--images-container-padding) + ${columns} * ${
        options.image_max_width
      }px + ${columns - 1} * var(--images-container-gap))`,
      ...style,
    };
  }, [options.columns, options.image_max_width, style]);

  const renderExtractImages = () => {
    if (extractType === "image") {
      return visibleImages;
    } else if (extractType === "detailImages") {
      return detailImages;
    } else if (extractType === "thumbnail") {
      return thumbnail;
    }
  };

  const showImageUrl = useMemo(
    () => options.show_image_url === "true",
    [options.show_image_url]
  );

  const showOpenImageButton = useMemo(
    () => options.show_open_image_button === "true",
    [options.show_open_image_button]
  );

  const showDownloadImageButton = useMemo(
    () => options.show_download_image_button === "true",
    [options.show_download_image_button]
  );

  const someImagesAreSelected = useMemo(
    () =>
      visibleImages.length > 0 &&
      visibleImages.some(isIncludedIn(selectedImages)),
    [visibleImages, selectedImages]
  );

  const allImagesAreSelected: boolean = useMemo(
    () =>
      visibleImages.length > 0 &&
      visibleImages.every(isIncludedIn(selectedImages)),
    [visibleImages, selectedImages]
  );

  // const handleOnClickImg = (e:React.MouseEvent) => {
  //   const eventTarget = e.target
  //   chrome.runtime.sendMessage({
  //     type: "selectImg",
  //     selecteImg : eventTarget.src ?? ,
  //   });
  // }

  return (
    <div id="images_container" style={containerStyle}>
      <CheckBoxV2
        title={"allImages"}
        checked={extractType === "image"}
        onClick={() => {
          setExtractType("image");
        }}
      />

      {/* <CheckBoxV2
        title={"thumbnail"}
        checked={extractType === "thumbnail"}
        onClick={() => {
          setExtractType("thumbnail");
        }}
      /> */}
      <CheckBoxV2
        title={"detailImages"}
        checked={extractType === "detailImages"}
        onClick={() => {
          setExtractType("detailImages");
        }}
      />

      <Checkbox
        class="select_all_checkbox"
        checked={allImagesAreSelected}
        indeterminate={someImagesAreSelected && !allImagesAreSelected}
        onChange={({ currentTarget: { checked } }) => {
          setSelectedImages(checked ? renderExtractImages() : []);
        }}
        style={""}
      >
        Select all ({imagesToDownload.length} / {renderExtractImages().length})
      </Checkbox>

      {renderExtractImages().map((imageUrl: string, index: number) => (
        <div
          id={`card_${index}`}
          className={`card ${
            selectedImages.includes(imageUrl) ? "checked" : ""
          }`}
          style={{ minHeight: `${options.image_max_width}px` }}
          onClick={() => {
            setSelectedImages((selectedImages: string[]) =>
              selectedImages.includes(imageUrl)
                ? selectedImages.filter(isNotStrictEqual(imageUrl))
                : [...selectedImages, imageUrl]
            );
          }}
        >
          <img
            src={imageUrl}
            style={{
              minWidth: `${options.image_min_width}px`,
              maxWidth: `${options.image_max_width}px`,
            }}
          />

          <div className="checkbox"></div>

          {(showOpenImageButton || showDownloadImageButton) && (
            <div className="actions">
              {showOpenImageButton && (
                <OpenImageButton
                  imageUrl={imageUrl}
                  onClick={() => {
                    stopPropagation;
                  }}
                />
              )}
              {showDownloadImageButton && (
                <DownloadImageButton
                  imageUrl={imageUrl}
                  options={options}
                  onClick={() => {
                    stopPropagation;
                  }}
                />
              )}
            </div>
          )}
          {showImageUrl && (
            <div className="image_url_container">
              <ImageUrlTextbox
                value={imageUrl}
                onClick={() => {
                  stopPropagation;
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
