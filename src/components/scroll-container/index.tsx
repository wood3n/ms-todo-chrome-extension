import React from "react";

import { ScrollShadow } from "@nextui-org/react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";

interface Props {
  children: React.ReactNode;
}

const ScrollContainer = ({ children }: Props) => {
  return (
    <SimpleBar style={{ height: "100%" }}>
      {({ scrollableNodeRef, scrollableNodeProps, contentNodeRef, contentNodeProps }) => {
        return (
          <ScrollShadow ref={scrollableNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("p-2 h-full", scrollableNodeProps.className)}>
            <div ref={contentNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("flex flex-col space-y-2", contentNodeProps.className)}>
              {children}
            </div>
          </ScrollShadow>
        );
      }}
    </SimpleBar>
  );
};

export default ScrollContainer;
