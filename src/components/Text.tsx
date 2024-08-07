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

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
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
    <p style={textStyle} {...props}>
      {props.children}
    </p>
  );
};

export default Text;
