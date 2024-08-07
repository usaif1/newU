// depdenencies
import React, { HTMLAttributes } from "react";

type ScreenWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  width?: number | string;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = (props) => {
  return (
    <div
      style={{
        width: props?.width || "70%",
        margin: "auto",
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default ScreenWrapper;
