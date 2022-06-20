import React from "react";

export const Checkbox = ({
  children,
  class: className,
  indeterminate,
  style,
  title = "",
  ...props
}) => {
  const setIndeterminate = (indeterminate) => (element) => {
    if (element) {
      element.indeterminate = indeterminate;
    }
  };

  return (
    <label>
      <input
        ref={setIndeterminate(indeterminate)}
        type="checkbox"
        style={{ marginLeft: 0, ...style }}
        {...props}
      />
      {children}
    </label>
  );
};
