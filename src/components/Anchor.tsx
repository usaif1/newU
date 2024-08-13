/**
 * Anchor Component
*  The Anchor component is a styled link component that leverages react-router-dom's Link component. 
*  It allows for additional styling options such as color, weight, and size.
*  It serves as the common link component for the application.
 */

// dependencies
import React from "react";
import { Link, LinkProps } from "react-router-dom";

// styling
import {
  Color,
  TextColor,
  Size,
  TextSize,
  Weight,
  TextWeight,
} from "@/styles/text";

type AnchorProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
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
