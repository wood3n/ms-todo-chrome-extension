import React, { useState } from "react";

import { DeleteFour, Download } from "@icon-park/react";
import type { TaskFileAttachment, TodoTask } from "@microsoft/microsoft-graph-types";
import { Card, CardBody } from "@nextui-org/react";
import classNames from "classnames";
import { filesize } from "filesize";

import AsyncButton from "../async-button";

interface Props {
  task: TodoTask;
  data: TaskFileAttachment;
  onDownload: VoidFunction;
  onDelete: VoidFunction;
}

const Attachment = ({ data, onDownload, onDelete }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      radius="sm"
      shadow="sm"
      isHoverable
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBody
        className="flex-row items-center justify-between space-x-4"
        onClick={onDownload}
      >
        <div className="flex min-w-0 flex-1 items-center justify-between space-x-2">
          <span className="flex min-w-0 flex-1 items-center space-x-1">
            <span className="flex-1 truncate text-base">{data.name}</span>
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
          <span>
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

export default Attachment;
