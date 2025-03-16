import type { OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

import { useTheme } from "@/utils/theme";

const ScrollContainer = (props: OverlayScrollbarsComponentProps) => {
  const { isDark } = useTheme();

  return (
    <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "leave", theme: isDark ? "os-theme-light" : "os-theme-dark" } }} {...props} />
  );
};

export default ScrollContainer;
