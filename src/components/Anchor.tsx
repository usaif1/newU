// de
import React from "react";
import { Link } from "react-router-dom";

// styling
import {
  Color,
  TextColor,
  Size,
  TextSize,
  Weight,
  TextWeight,
} from "@/styles/text";

type AnchorProps = React.HTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: React.ReactNode;
  color?: TextColor;
  weight?: TextWeight;
  size?: TextSize;
};

const Anchor: React.FC<AnchorProps> = (props) => {
  const textStyle: React.CSSProperties = {
    color: Color[props.color || "alternate"],
    fontWeight: Weight[props.weight || "text-400"],
    fontSize: Size[props.size || "sm"],
  };

  return (
    <Link {...props} to={props.to} style={textStyle}>
      {props.children}
    </Link>
  );
};

export default Anchor;
