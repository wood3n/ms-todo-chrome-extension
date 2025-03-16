import EmptyIcon from "@/assets/empty.svg?react";
import { Card } from "@nextui-org/react";
import React from "react";

interface Props {
  size?: "sm" | "default";
  description?: React.ReactNode;
}

const Empty = ({ size = "default", description }: Props) => {
  const iconSize = size === "sm" ? 24 : 48;

  return (
    <Card className="flex h-full w-full flex-col items-center justify-center space-y-2 py-3 text-gray-500">
      <EmptyIcon width={iconSize} height={iconSize} />
      <div>{description}</div>
    </Card>
  );
};

export default Empty;
