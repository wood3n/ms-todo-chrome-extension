import React from "react";

import SimpleBar, { type Props } from "simplebar-react";

const ScrollContainer = (props: Props) => {
  return (
    <SimpleBar style={{ height: "100%" }} {...props} />
  );
};

export default ScrollContainer;
