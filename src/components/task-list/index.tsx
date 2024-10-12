import { useState } from "react";

import type { TaskStatus } from "@microsoft/microsoft-graph-types";
import { Card, CardBody, CardFooter, CardHeader, Checkbox, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { useRequest } from "ahooks";
import classNames from "classnames";
import SimpleBar from "simplebar-react";

import { getTaskList } from "@/api";
import Spin from "@/components/spin";
import { useTodoList } from "@/context";

import TaskCardFooter from "./task-card-footer";

import "simplebar-react/dist/simplebar.min.css";

interface Props {
  className?: string;
}

const TodoTaskList = ({ className }: Props) => {
  const todoData = useTodoList(state => state.currentTodoData);
  const [status, setStatus] = useState<TaskStatus>("inProgress");

  const tabs = [
    {
      label: (
        <div className="flex items-center space-x-1">
          <span>⏳</span>
          <span>进行中</span>
        </div>
      ),
      key: "inProgress",
    },
    {
      label: (
        <div className="flex items-center space-x-1">
          <span>✅</span>
          <span>已完成</span>
        </div>
      ),
      key: "completed",
    },
  ];

  const {
    data: tasks,
    loading,
  } = useRequest(
    async () => {
      if (todoData?.id) {
        let $filter: string;
        if (status === "completed") {
          $filter = `status eq 'completed'`;
        }
        else {
          // fucking api don't support in and not
          $filter = `status eq 'notStarted' or status eq 'inProgress' or status eq 'waitingOnOthers' or status eq 'deferred'`;
        }

        const res = await getTaskList(todoData.id, {
          // i think people do not need to read so much task
          $top: 100,
          $filter,
        });

        return res?.value;
      }

      return null;
    },
    {
      refreshDeps: [todoData, status],
    },
  );

  if (!tasks?.length) {
    return null;
  }

  return (
    <Card className={classNames("h-full", className)} shadow="sm">
      <CardHeader className="flex flex-col px-2 pb-0 pt-2">
        <Tabs
          size="sm"
          color="primary"
          selectedKey={status}
          onSelectionChange={key => setStatus(key as TaskStatus)}
        >
          {tabs.map(item => (
            <Tab key={item.key} title={item.label} />
          ))}
        </Tabs>
      </CardHeader>
      <CardBody className="p-0">
        <Spin loading={loading}>
          <SimpleBar style={{ height: "100%" }}>
            {({ scrollableNodeRef, scrollableNodeProps, contentNodeRef, contentNodeProps }) => {
              return (
                <ScrollShadow ref={scrollableNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("p-2 h-full", scrollableNodeProps.className)}>
                  <div ref={contentNodeRef as React.MutableRefObject<HTMLDivElement>} className={classNames("flex flex-col space-y-2", contentNodeProps.className)}>
                    {tasks.map(item => (
                      <Card isHoverable isPressable allowTextSelectionOnPress key={item.id} shadow="sm" className="w-full overflow-x-hidden">
                        <CardBody className="flex flex-row">
                          <div className="flex min-w-0 grow flex-col space-y-1">
                            <div className={classNames("truncate text-base", {
                              "line-through": status === "completed",
                            })}
                            >
                              {item.title}
                            </div>
                            {Boolean(item.body?.content) && (
                              <div className="truncate text-xs text-gray-500">{item.body!.content}</div>
                            )}
                          </div>
                          <Checkbox
                            radius="full"
                            isSelected={status === "completed"}
                            color={status === "completed" ? "success" : "primary"}
                          />
                        </CardBody>
                        {status !== "completed" && (
                          <TaskCardFooter task={item} />
                        )}
                      </Card>
                    ))}
                  </div>
                </ScrollShadow>
              );
            }}
          </SimpleBar>
        </Spin>
      </CardBody>
      <CardFooter>
        footer
      </CardFooter>
    </Card>
  );
};

export default TodoTaskList;
