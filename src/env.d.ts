/// <reference types="@rsbuild/core/types" />
declare module "*.svg?react" {
  import type * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGElement> & { title?: string }>;

  export default ReactComponent;
}
