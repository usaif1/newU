/**
 * The Divider component is a simple React functional component that renders a horizontal or vertical divider with customizable width and height.
 * Used to separate content in a layout.
 */

// dependencies
import React from "react";

type DividerProps = {
  width?: number | string;
  height?: string;
};

const Divider: React.FC<DividerProps> = ({
  height = "0.5rem",
  width = "100%",
}) => {
  return <div style={{ height: height, width: width }} />;
};

export default Divider;
