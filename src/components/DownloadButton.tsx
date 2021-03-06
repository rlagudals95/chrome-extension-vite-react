import React from "react";

// TODO: Implement loading animation
export const DownloadButton = ({ disabled, loading, ...props }) => {
  const tooltipText = disabled
    ? "Select some images to download first"
    : loading
    ? "If you want, you can close the extension popup\nwhile the images are downloading!"
    : "";

  return (
    <input
      type="button"
      className="accent ${loading ? 'loading' : ''}"
      value={loading ? "•••" : "Download"}
      disabled={disabled || loading}
      title={tooltipText}
      {...props}
    />
  );
};
