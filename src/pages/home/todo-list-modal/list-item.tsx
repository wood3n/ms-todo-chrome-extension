import { useState } from "react";
import type React from "react";
import { useTranslation } from "react-i18next";

import { Delete, Edit, HomeTwo, Pin } from "@icon-park/react";
import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { Button, Card, CardBody, Tooltip, useDisclosure } from "@nextui-org/react";
import classNames from "classnames";
import { motion } from "framer-motion";

import { useTodoList } from "@/context";

import EditItem from "./edit";

interface Props {
  data: TodoTaskList;
  isSelected: boolean;
  onToggle: () => void;
  onUpdate: (name: string) => Promise<void>;
  onPinned: () => Promise<void>;
  onDelete: () => Promise<void>;
}

const ListItem: React.FC<Props> = ({ data, isSelected, onToggle, onUpdate, onPinned, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const pinnedTodoData = useTodoList(store => store.pinnedTodoData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  const isPinned = data.id === pinnedTodoData.id;
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
          {isPinned
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
            {!isPinned && (
              <Tooltip content={t("Pin to homepage")} color="primary" closeDelay={0}>
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
                <Tooltip content={t("modify")} closeDelay={0}>
                  <Button
                    isIconOnly
                    size="sm"
                    className="h-6 w-6 min-w-min p-1"
                    onClick={onOpen}
                  >
                    <Edit theme="outline" />
                  </Button>
                </Tooltip>
                <Tooltip content={t("delete")} color="danger" closeDelay={0}>
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
