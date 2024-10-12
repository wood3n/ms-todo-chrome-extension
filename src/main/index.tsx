import React from "react";

import { MoreTwo } from "@icon-park/react";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";

import TodoTaskList from "@/components/task-list";
import { useTodoList, useUser } from "@/context";
import { getLocalDate } from "@/utils/date";

const Main = () => {
  const user = useUser(state => state.user);
  const todoData = useTodoList(state => state.currentTodoData);

  return (
    <div className="flex h-full flex-col space-y-2 p-1">
      <Card className="h-auto flex-none">
        <CardBody className="flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="truncate text-lg">{todoData.displayName}</div>
              <Button isIconOnly variant="light" size="sm" className="max-h-6 max-w-6 p-0"><MoreTwo theme="outline" size="14" /></Button>
            </div>
            <p>{getLocalDate()}</p>
          </div>
          <Avatar isBordered src={user.avatar} className="cursor-pointer" />
        </CardBody>
      </Card>
      <TodoTaskList className="min-h-0 grow overflow-auto" />
    </div>
  );
};

export default Main;
