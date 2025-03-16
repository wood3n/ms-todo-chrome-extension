import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getLocalTimeZone } from "@internationalized/date";
import { useRequest } from "ahooks";
import classNames from "classnames";

import { createTask, deleteTask, getTaskList, updateTask } from "@/api";
import Empty from "@/components/empty";
import NameInput from "@/components/name-input";
import ScrollContainer from "@/components/scroll-container";
import SpinContainer from "@/components/spin-container";
import { useTodoList } from "@/context";
import { updateBadge } from "@/utils/badge";
import { clearNotification, createNotification } from "@/utils/task-alarm";

import TaskListItem from "./list-item";
import TaskStatusTabs, { type Status } from "./task-status-tabs";

interface Props {
  className?: string;
}

const TaskList = ({ className }: Props) => {
  const currentTodoData = useTodoList(state => state.currentTodoData);
  const pinnedTodoData = useTodoList(store => store.pinnedTodoData);
  const [status, setStatus] = useState<Status>("inProgress");
  const { t } = useTranslation();

  const { data: tasks, refreshAsync, loading } = useRequest(async () => {
    if (currentTodoData?.id) {
      const res = await getTaskList(currentTodoData.id!, {
        $top: 200,
        $orderby: `createdDateTime desc`,
      });

      if (Array.isArray(res?.value)) {
        if (currentTodoData.id === pinnedTodoData.id) {
          const inProgressTasks = res.value.filter(item => item.status !== "completed");

          updateBadge(inProgressTasks?.length || "");

          inProgressTasks?.forEach((task) => {
            if (task.reminderDateTime?.dateTime) {
              createNotification({ task });
            }
          });
        }

        return res.value;
      }
    }
    else {
      return [];
    }
  }, {
    refreshDeps: [currentTodoData.id],
  });

  const inProgressTasks = useMemo(() => {
    return tasks?.filter(item => item.status !== "completed");
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks?.filter(item => item.status === "completed");
  }, [tasks]);

  const currentTasks = status === "completed" ? completedTasks : inProgressTasks;

  return (
    <Card className={classNames("h-full", className)} shadow="sm">
      <CardHeader className="flex flex-col p-1">
        <TaskStatusTabs
          tabs={[
            {
              label: `⏳ ${t("inProgress")}${inProgressTasks?.length ? `(${inProgressTasks.length})` : ""}`,
              key: "inProgress",
            },
            {
              label: `✅ ${t("completed")}${completedTasks?.length ? `(${completedTasks.length})` : ""}`,
              key: "completed",
            },
          ]}
          selectedKey={status}
          onChange={key => setStatus(key)}
        />
      </CardHeader>
      <CardBody className="p-0">
        <SpinContainer loading={loading}>
          {currentTasks?.length
            ? (
                <ScrollContainer className="p-2">
                  <div className="flex flex-col space-y-2">
                    {currentTasks?.map(item => (
                      <TaskListItem
                        key={item.id}
                        data={item}
                        onUpdate={async (newData) => {
                          await updateTask(currentTodoData.id!, item.id!, newData);

                          await refreshAsync();
                        }}
                        onComplete={async () => {
                          await updateTask(currentTodoData.id!, item.id!, {
                            status: "completed",
                            completedDateTime: {
                              dateTime: new Date().toISOString(),
                              timeZone: getLocalTimeZone(),
                            },
                          });

                          await clearNotification(item.id!);

                          await refreshAsync();
                        }}
                        onDelete={async () => {
                          await deleteTask(currentTodoData.id!, item.id!);

                          await clearNotification(item.id!);

                          await refreshAsync();
                        }}
                      />
                    ))}
                  </div>
                </ScrollContainer>
              )
            : (
                <Empty description={t("noTask")} />
              )}
        </SpinContainer>
      </CardBody>
      {Boolean(currentTodoData?.id) && status === "inProgress" && (
        <CardFooter className="flex-none">
          <NameInput
            autoFocus
            placeholder={t("addTask")}
            onSubmit={async (title) => {
              if (!loading) {
                await createTask(currentTodoData.id!, {
                  title,
                });

                await refreshAsync();
              }
            }}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskList;
