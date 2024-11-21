import React, { useState } from "react";

import { DeleteFour } from "@icon-park/react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { filesize } from "filesize";

import AsyncButton from "@/components/async-button";

import SpinContainer from "../spin-container";

interface Props {
  onDownload: () => Promise<void>;
  onDelete: VoidFunction;
  name?: string;
  size?: number;
  isUploading?: boolean;
  uploadProgress?: number;
  errorMessage?: React.ReactNode;
  className?: string;
}

const FileItem = ({ name, size, onDownload, onDelete, isUploading, errorMessage, className }: Props) => {
  const [downloading, setDownloading] = useState(false);

  return (
    <SpinContainer loading={downloading}>
      <Card
        shadow="none"
        radius="sm"
        isHoverable
        className={classNames("cursor-pointer border border-solid border-gray-300", {
          "border-red-300": Boolean(errorMessage),
        }, className)}
      >
        <CardBody
          className="flex-row items-center justify-between space-x-4 p-2"
          onClick={async () => {
            setDownloading(true);
            try {
              await onDownload();
            }
            finally {
              setDownloading(false);
            }
          }}
        >
          <div className="flex min-w-0 grow items-center space-x-2">
            <span className="flex min-w-0 grow items-center space-x-1">
              {isUploading && (
                <Spinner size="sm" />
              )}
              <span className="truncate">{name || "unknown"}</span>
            </span>
            <span className="flex-none">
              {size && filesize(size)}
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
    </SpinContainer>
  );
};

export default FileItem;
