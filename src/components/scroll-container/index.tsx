import React from "react";

import SimpleBar, { type Props } from "simplebar-react";

const ScrollContainer = (props: Props) => {
  return (
    <SimpleBar {...props} style={{ height: "100%" }} />
  );
};

export default ScrollContainer;
