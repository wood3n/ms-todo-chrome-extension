import { useEffect, useState } from "react";

import { getLocalTimeZone } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, CardFooter, CardHeader, ScrollShadow } from "@nextui-org/react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";

import { createTask, getTaskList, updateTask } from "@/api";
import { useTodoList } from "@/context";

import Empty from "../empty";
import NameInput from "../name-input";
import Spin from "../spin";
import SpinContainer from "../spin-container";
import TaskListItem from "./list-item";
import TaskStatusTabs, { type Status } from "./task-status-tabs";

import "simplebar-react/dist/simplebar.min.css";

interface Props {
  className?: string;
}

const TodoTaskList = ({ className }: Props) => {
  const todoData = useTodoList(state => state.currentTodoData);
  const [status, setStatus] = useState<Status>("inProgress");
  const [initLoading, setInitLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [tasks, setTasks] = useState<TodoTask[]>();

  const getTasks = async () => {
    if (todoData.id) {
      let $filter: string;
      let $orderby;
      if (status === "completed") {
        $filter = `status eq 'completed'`;
        $orderby = `completedDateTime/dateTime desc`;
      }
      else {
        // fucking api doesn't support in and not
        $filter = `status eq 'notStarted' or status eq 'inProgress' or status eq 'waitingOnOthers' or status eq 'deferred'`;
      }

      const res = await getTaskList(todoData.id, {
        // i think people do not need to read so much task
        $top: 100,
        $filter,
        $orderby,
      });

      if (res?.value) {
        setTasks(res.value);
      }
    }
  };

  useEffect(() => {
    setInitLoading(true);
    getTasks().finally(() => {
      setInitLoading(false);
    });
  }, [todoData, status]);

  return (
    <Card className={classNames("h-full", className)} shadow="sm">
      <CardHeader className="flex flex-col px-2 pb-0 pt-2">
        <TaskStatusTabs
          status={status}
          onChange={key => setStatus(key)}
        />
      </CardHeader>
      <CardBody className="p-0">
        <Spin loading={initLoading}>
          <SpinContainer loading={updateLoading}>
            {tasks?.length
              ? (
                  <SimpleBar style={{ height: "100%" }}>
                    {({ scrollableNodeRef, scrollableNodeProps, contentNodeRef, contentNodeProps }) => {
                      return (
                        <ScrollShadow ref={scrollableNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("p-2 h-full", scrollableNodeProps.className)}>
                          <div ref={contentNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("flex flex-col space-y-2", contentNodeProps.className)}>
                            {tasks?.map(item => (
                              <TaskListItem
                                key={item.id}
                                data={item}
                                onUpdate={async (newData) => {
                                  setUpdateLoading(true);
                                  try {
                                    await updateTask(todoData.id!, item.id!, newData);

                                    await getTasks();
                                  }
                                  finally {
                                    setUpdateLoading(false);
                                  }
                                }}
                                onComplete={async () => {
                                  setUpdateLoading(true);
                                  try {
                                    await updateTask(todoData.id!, item.id!, {
                                      status: "completed",
                                      completedDateTime: {
                                        dateTime: new Date().toISOString(),
                                        timeZone: getLocalTimeZone(),
                                      },
                                    });

                                    await getTasks();
                                  }
                                  finally {
                                    setUpdateLoading(false);
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </ScrollShadow>
                      );
                    }}
                  </SimpleBar>
                )
              : (
                  <Empty description="暂无任务" />
                )}
          </SpinContainer>
        </Spin>
      </CardBody>
      {Boolean(todoData?.id) && status === "inProgress" && (
        <CardFooter className="flex-none">
          <NameInput
            autoFocus
            placeholder="添加任务"
            onSubmit={async (title) => {
              setUpdateLoading(true);
              try {
                await createTask(todoData.id!, {
                  title,
                });

                await getTasks();
              }
              finally {
                setUpdateLoading(false);
              }
            }}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default TodoTaskList;
