import React, { useState } from "react";

import { DeleteFour, Download } from "@icon-park/react";
import type { TaskFileAttachment } from "@microsoft/microsoft-graph-types";
import { Card, CardBody } from "@nextui-org/react";
import classNames from "classnames";
import { filesize } from "filesize";

import AsyncButton from "@/components/async-button";

interface Props {
  data: TaskFileAttachment;
  onDownload: VoidFunction;
  onDelete: VoidFunction;
  className?: string;
}

const AttachmentFile = ({ data, onDownload, onDelete, className }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      radius="sm"
      shadow="none"
      isHoverable
      className={classNames("cursor-pointer border border-solid border-gray-300", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBody
        className="flex-row items-center justify-between space-x-4 p-2"
        onClick={onDownload}
      >
        <div className="flex min-w-0 grow items-center space-x-2">
          <span className="flex min-w-0 grow items-center space-x-1">
            <span className="truncate text-xs">{data.name}</span>
            {hovered && (
              <span className={classNames("transition-all", {
                "opacity-0": !hovered,
                "opacity-1": hovered,
              })}
              >
                <Download size={16} />
              </span>
            )}
          </span>
          <span className="flex-none">
            {data.size && filesize(data.size)}
          </span>
        </div>
        <AsyncButton
          size="sm"
          isIconOnly
          variant="flat"
          color="danger"
          radius="full"
          className="h-6 min-h-6 w-6 min-w-6"
          onClick={onDelete}
        >
          <DeleteFour />
        </AsyncButton>
      </CardBody>
    </Card>
  );
};

export default AttachmentFile;
