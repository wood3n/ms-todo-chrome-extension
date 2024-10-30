import React from "react";

import { DropDownList } from "@icon-park/react";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";

import User from "@/components/user";
import { useTodoList } from "@/context";
import { getLocalDate } from "@/utils/date";

import TodoListModal from "../todo-list-modal";

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
          <div className="flex items-center">
            <div className="truncate text-lg">{todoData.displayName}</div>
            <a className="cursor-pointer rounded p-1 transition hover:bg-gray-200 hover:text-blue-500" onClick={onOpen}><DropDownList theme="outline" size={16} /></a>
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
