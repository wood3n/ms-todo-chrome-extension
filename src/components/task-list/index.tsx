import { useEffect, useMemo, useState } from "react";

import { getLocalTimeZone } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, CardFooter, CardHeader, ScrollShadow } from "@nextui-org/react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";

import { createTask, deleteTask, getTaskList, updateTask } from "@/api";
import { useTodoList } from "@/context";
import { updateBadge } from "@/utils/badge";

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
  const currentTodoData = useTodoList(state => state.currentTodoData);
  const pinnedTodoData = useTodoList(store => store.pinnedTodoData);
  const [status, setStatus] = useState<Status>("inProgress");
  const [initLoading, setInitLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [tasks, setTasks] = useState<TodoTask[]>();

  const getTasks = async () => {
    const res = await getTaskList(currentTodoData.id!, {
      $top: 200,
      $orderby: `createdDateTime desc`,
    });

    if (res?.value) {
      setTasks(res.value);

      if (currentTodoData.id === pinnedTodoData.id) {
        const inProgressTasks = res.value.filter(item => item.status !== "completed");

        if (inProgressTasks?.length) {
          updateBadge(inProgressTasks.length);
        }
      }
    }
  };

  useEffect(() => {
    if (currentTodoData?.id) {
      setInitLoading(true);
      getTasks().finally(() => {
        setInitLoading(false);
      });
    }
  }, [currentTodoData]);

  const inProgressTasks = useMemo(() => {
    return tasks?.filter(item => item.status !== "completed");
  }, [tasks, currentTodoData, pinnedTodoData]);

  const completedTasks = useMemo(() => {
    return tasks?.filter(item => item.status === "completed");
  }, [tasks]);

  const currentTasks = status === "completed" ? completedTasks : inProgressTasks;

  return (
    <Card className={classNames("h-full", className)} shadow="sm">
      <CardHeader className="flex flex-col px-2 pb-0 pt-2">
        <TaskStatusTabs
          tabs={[
            {
              label: `⏳ 进行中${inProgressTasks?.length ? `（${inProgressTasks.length}）` : ""}`,
              key: "inProgress",
            },
            {
              label: `✅ 已完成${completedTasks?.length ? `（${completedTasks.length}）` : ""}`,
              key: "completed",
            },
          ]}
          selectedKey={status}
          onChange={key => setStatus(key)}
        />
      </CardHeader>
      <CardBody className="p-0">
        <Spin loading={initLoading}>
          <SpinContainer loading={updateLoading}>
            {currentTasks?.length
              ? (
                  <SimpleBar style={{ height: "100%" }}>
                    {({ scrollableNodeRef, scrollableNodeProps, contentNodeRef, contentNodeProps }) => {
                      return (
                        <ScrollShadow ref={scrollableNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("p-2 h-full", scrollableNodeProps.className)}>
                          <div ref={contentNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("flex flex-col space-y-2", contentNodeProps.className)}>
                            {currentTasks?.map(item => (
                              <TaskListItem
                                key={item.id}
                                data={item}
                                onUpdate={async (newData) => {
                                  setUpdateLoading(true);
                                  try {
                                    await updateTask(currentTodoData.id!, item.id!, newData);

                                    await getTasks();
                                  }
                                  finally {
                                    setUpdateLoading(false);
                                  }
                                }}
                                onComplete={async () => {
                                  setUpdateLoading(true);
                                  try {
                                    await updateTask(currentTodoData.id!, item.id!, {
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
                                onDelete={async () => {
                                  setUpdateLoading(true);
                                  try {
                                    await deleteTask(currentTodoData.id!, item.id!);

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
      {Boolean(currentTodoData?.id) && status === "inProgress" && (
        <CardFooter className="flex-none">
          <NameInput
            autoFocus
            placeholder="添加任务"
            onSubmit={async (title) => {
              setUpdateLoading(true);
              try {
                await createTask(currentTodoData.id!, {
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
