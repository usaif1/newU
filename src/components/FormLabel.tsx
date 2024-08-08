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

type FormLabel = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  color?: TextColor;
  weight?: TextWeight;
  size?: TextSize;
  children: React.ReactNode;
};

const FormLabel: React.FC<FormLabel> = (props) => {
  const textStyle: React.CSSProperties = {
    color: Color[props.color || "primary"],
    fontWeight: Weight[props.weight || "text-400"],
    fontSize: Size[props.size || "base"],
  };

  return (
    <label {...props} style={textStyle}>
      {props.children}
    </label>
  );
};

export default FormLabel;
