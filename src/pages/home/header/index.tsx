import React from "react";

import { More } from "@icon-park/react";
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";

import { useTodoList } from "@/context";
import { getLocalDate } from "@/utils/date";

import TodoListModal from "../todo-list-modal";
import User from "./user";

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  const todoData = useTodoList(state => state.currentTodoData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className={className}>
      <CardBody className="flex flex-row items-center justify-between">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-1">
            <div className="truncate text-lg">{todoData.displayName}</div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="h-6 w-6 min-w-min"
              onClick={onOpen}
            >
              <More theme="outline" size={18} />
            </Button>
          </div>
          <p>{getLocalDate()}</p>
        </div>
        <User />
      </CardBody>
      <TodoListModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </Card>
  );
};

export default Header;
