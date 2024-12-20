import React from "react";

import SimpleBar, { type Props } from "simplebar-react";

import "simplebar-react/dist/simplebar.min.css";

const ScrollContainer = (props: Props) => {
  return (
    <SimpleBar {...props} style={{ height: "100%" }} />
  );
};

export default ScrollContainer;
