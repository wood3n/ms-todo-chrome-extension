import React from "react";

import EmptyIcon from "@/assets/empty.svg?react";

interface Props {
  description?: React.ReactNode;
}

const Empty = ({ description }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2 text-gray-500">
      <EmptyIcon width={48} height={48} />
      <div>{description}</div>
    </div>
  );
};

export default Empty;
