import { useState } from "react";
import type React from "react";

import { Delete, Pin } from "@icon-park/react";
import { Button, Card, CardBody, Tooltip } from "@nextui-org/react";

interface Props {
  name: string;
}

const ListItem: React.FC<Props> = ({ name }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card>
      <CardBody className="flex items-center text-lg" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="flex-auto truncate text-lg">{name}</div>
        {hovered && (
          <div className="flex flex-none items-center justify-center">
            <Tooltip content="固定到首页">
              <Button isIconOnly size="sm">
                <Pin theme="outline" />
              </Button>
            </Tooltip>
            <Tooltip content="删除" color="danger">
              <Button isIconOnly size="sm" color="danger">
                <Delete theme="outline" />
              </Button>
            </Tooltip>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ListItem;
