import React from "react";

import EmptyIcon from "@/assets/empty.svg?react";

interface Props {
  size?: "sm" | "default";
  description?: React.ReactNode;
}

const Empty = ({ size = "default", description }: Props) => {
  const iconSize = size === "sm" ? 24 : 48;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2 py-4 text-gray-500">
      <EmptyIcon width={iconSize} height={iconSize} />
      <div>{description}</div>
    </div>
  );
};

export default Empty;
