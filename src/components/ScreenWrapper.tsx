/**
 * A container component that wraps its children with customizable width and other HTML attributes.
 * Serves as the first level container for the different screens in the application to maintain a consistent layout.
 */

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
        width: props?.width || "80%",
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
