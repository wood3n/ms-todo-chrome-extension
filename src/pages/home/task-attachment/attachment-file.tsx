import React from "react";

import { DeleteFour } from "@icon-park/react";
import type { TaskFileAttachment } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { filesize } from "filesize";

import AsyncButton from "@/components/async-button";

interface Props {
  data: TaskFileAttachment;
  onDownload: VoidFunction;
  onDelete: VoidFunction;
  isUploading?: boolean;
  isError?: boolean;
  uploadProgress?: number;
  className?: string;
}

const AttachmentFile = ({ data, onDownload, onDelete, isUploading, className }: Props) => {
  return (
    <Card
      className={classNames("cursor-pointer border border-solid border-gray-300", className)}
    >
      <CardBody
        className="flex-row items-center justify-between space-x-4 p-2"
        onClick={onDownload}
      >
        <div className="flex min-w-0 grow items-center space-x-2">
          <span className="min-w-0 grow">
            {data.name}
          </span>
          <span className="flex-none">
            {data.size && filesize(data.size)}
          </span>
        </div>
        {isUploading
          ? (
              <Spinner size="sm" />
            )
          : (
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
            )}
      </CardBody>
    </Card>
  );
};

export default AttachmentFile;
