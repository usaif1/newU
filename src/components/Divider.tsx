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
