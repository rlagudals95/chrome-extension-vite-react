import * as React from "react";

interface StyleCustom {}

interface IProps {
  children?: React.ReactNode;
  className?: string;
  indeterminate?: any;
  style?: any;
  title?: string;
  checked?: boolean;
  onChange?: React.ChangeEvent;
}

const RadioButton = (props: IProps) => {
  const {
    children,
    className,
    indeterminate,
    style,
    title,
    checked,
    onChange,
  }: IProps = props;

  const [value, setValue] = React.useState(false);

  const handleChange = () => {
    setValue(!value);
  };

  return (
    <div>
      <label>
        <input type="radio" checked={value} onChange={handleChange} />
        {children}
      </label>
    </div>
  );
};

export default RadioButton;
