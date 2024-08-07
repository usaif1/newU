import React from "react";

type ContainerCenterProps = {
  children: React.ReactNode;
  width?: number | string;
};

const ContainerCenter: React.FC<ContainerCenterProps> = ({
  children,
  width = "60%",
}) => {
  return <div style={{ width: width, margin: "auto" }}>{children}</div>;
};

export default ContainerCenter;
