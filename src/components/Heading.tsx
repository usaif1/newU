/**
 * A versatile heading component for displaying text with various styles and sizes.
 * Used to display headings in the application.
 */

// dependencies
import React from "react";

// styling
import {
  Color,
  TextColor,
  Weight,
  TextWeight,
  Size as TextSize,
} from "@/styles/text";

type size = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  size?: size;
  color?: TextColor;
  weight?: TextWeight;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
};

const Heading: React.FC<HeadingProps> = (props) => {
  const textStyle: React.CSSProperties = {
    color: Color[props.color || "primary"],
    fontWeight: Weight[props.weight || "text-400"],
    textAlign: props.align || "left",
  };

  switch (props.size) {
    case "h1": {
      return (
        <h1 style={{ ...textStyle, fontSize: TextSize["6xl"] }} {...props}>
          {props.children}
        </h1>
      );
    }

    case "h2": {
      return (
        <h2 style={{ ...textStyle, fontSize: TextSize["5xl"] }} {...props}>
          {props.children}
        </h2>
      );
    }

    case "h3": {
      return (
        <h3 style={{ ...textStyle, fontSize: TextSize["4xl"] }} {...props}>
          {props.children}
        </h3>
      );
    }

    case "h4": {
      return (
        <h4 style={{ ...textStyle, fontSize: TextSize["3xl"] }} {...props}>
          {props.children}
        </h4>
      );
    }

    case "h5": {
      return (
        <h5 style={{ ...textStyle, fontSize: TextSize["2xl"] }} {...props}>
          {props.children}
        </h5>
      );
    }

    case "h6": {
      return (
        <h6 style={{ ...textStyle, fontSize: TextSize["xl"] }} {...props}>
          {props.children}
        </h6>
      );
    }

    default: {
      return (
        <h4 style={{ ...textStyle, fontSize: TextSize["3xl"] }} {...props}>
          {props.children}
        </h4>
      );
    }
  }
};

export default Heading;
