import React, { useState } from "react";

import { DeleteFour, Download } from "@icon-park/react";
import { Button, Card, CardBody } from "@nextui-org/react";
import clx from "classnames";

interface Props {
  name: string;
}

const FileInfo = ({ name }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      isHoverable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-block h-16 w-16 border border-solid border-gray-300"
      shadow="none"
    >
      <CardBody className="h-full p-0">
        <div className="truncate p-4 text-sm">{name}</div>
        <div className={clx("absolute h-full w-full flex items-center p-2 space-x-1 bg-white opacity-50", {
          hidden: !hovered,
        })}
        >
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            color="primary"
            className="h-6 min-h-6 w-6 min-w-6 flex-1"
          >
            <Download />
          </Button>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            color="danger"
            className="h-6 min-h-6 w-6 min-w-6 flex-1"
          >
            <DeleteFour />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default FileInfo;
