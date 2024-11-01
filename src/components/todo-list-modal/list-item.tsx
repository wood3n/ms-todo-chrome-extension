import { useState } from "react";
import type React from "react";

import { Delete, Edit, HomeTwo, Pin } from "@icon-park/react";
import { Button, Card, CardBody, Tooltip, useDisclosure } from "@nextui-org/react";
import classNames from "classnames";
import { motion } from "framer-motion";

import type { TodoListDataType } from "@/context";

import EditItem from "./edit";

interface Props {
  data: TodoListDataType;
  isSelected: boolean;
  onToggle: () => void;
  onUpdate: (name: string) => Promise<void>;
  onPinned: () => Promise<void>;
  onDelete: () => Promise<void>;
}

const ListItem: React.FC<Props> = ({ data, isSelected, onToggle, onUpdate, onPinned, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isSelfCreated = data?.wellknownListName === "none";

  return (
    <Card isHoverable shadow="sm" className="cursor-pointer">
      <CardBody
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onToggle}
        className={classNames({
          "bg-blue-100": isSelected,
        })}
      >
        <div className="flex items-center space-x-2">
          { data.pinned
            ? <HomeTwo theme="outline" size={14} className="text-green-600" strokeWidth={4} />
            : null}
          <div className="flex-auto truncate text-base">{data.displayName}</div>
          <motion.div
            className="space-x-1"
            animate={hovered
              ? {
                  opacity: 1,
                  display: "flex",
                  alignItems: "center",
                }
              : {
                  opacity: 0,
                  display: "none",
                }}
          >
            {!data.pinned && (
              <Tooltip content="固定到首页" color="primary">
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  className="h-6 w-6 min-w-min p-1"
                  onClick={onPinned}
                >
                  <Pin theme="outline" />
                </Button>
              </Tooltip>
            )}
            {isSelfCreated && (
              <>
                <Tooltip content="修改">
                  <Button
                    isIconOnly
                    size="sm"
                    className="h-6 w-6 min-w-min p-1"
                    onClick={onOpen}
                  >
                    <Edit theme="outline" />
                  </Button>
                </Tooltip>
                <Tooltip content="删除" color="danger">
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    className="h-6 w-6 min-w-min p-1"
                    onClick={onDelete}
                  >
                    <Delete theme="outline" />
                  </Button>
                </Tooltip>
              </>
            )}
          </motion.div>
        </div>
      </CardBody>
      <EditItem
        data={data}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={onUpdate}
      />
    </Card>
  );
};

export default ListItem;
