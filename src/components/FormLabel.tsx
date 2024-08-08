// dependencies
import React from "react";

// styling
import {
  Color,
  TextColor,
  Size,
  TextSize,
  Weight,
  TextWeight,
} from "@/styles/text";

type TextProps = React.HTMLAttributes<HTMLLabelElement> & {
  color?: TextColor;
  weight?: TextWeight;
  size?: TextSize;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = (props) => {
  const textStyle: React.CSSProperties = {
    color: Color[props.color || "primary"],
    fontWeight: Weight[props.weight || "text-400"],
    fontSize: Size[props.size || "base"],
  };

  return (
    <label style={textStyle} {...props}>
      {props.children}
    </label>
  );
};

export default Text;
