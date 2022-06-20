import { Checkbox } from "./Checkbox";

export const DownloadConfirmation = ({
  onCheckboxChange,
  onClose,
  onConfirm,
  style,
  ...props
}) => {
  return (
    <div style={{ gridColumn: "1 / -1", ...style }} {...props}>
      <div>
        <hr />
        <p>Take a quick look at your browser settings.</p>
        <p className="danger">
          If the <b>Ask where to save each file before downloading</b> option is
          checked, proceeding might open a lot of popup windows. Continue with
          the download?
        </p>
      </div>

      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <div style={{ marginRight: "auto" }}>
          <Checkbox
            indeterminate={""}
            checked={""}
            class=""
            style={""}
            onChange={onCheckboxChange}
          >
            Got it, don't show again
          </Checkbox>
        </div>

        <input
          type="button"
          className="neutral ghost"
          value="Cancel"
          onClick={onClose}
        />

        <input
          type="button"
          className="success"
          value="Yes, Download"
          onClick={() => {
            onClose();
            onConfirm();
          }}
        />
      </div>
    </div>
  );
};
