import { getTaskList } from "@/api";
import Spin from "@/components/spin";
import { useTodoList } from "@/context";
import { More as MoreIcon } from "@icon-park/react";
import { Button, Checkbox, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, useDisclosure } from "@nextui-org/react";
import { useRequest } from "ahooks";
import CreateTask from "./create";

function TodoTaskList() {
  const todoData = useTodoList(state => state.currentTodoData);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    data: tasks,
    refreshAsync: refreshTaskList,
    loading,
  } = useRequest(
    async () => {
      if (todoData?.id) {
        const res = await getTaskList(todoData.id);

        return res?.value;
      }

      return null;
    },
    {
      refreshDeps: [todoData],
    },
  );

  if (!tasks?.length) {
    return null;
  }

  const processTasks = tasks.filter(item => item.status !== "completed");
  const completedTasks = tasks.filter(item => item.status === "completed");

  return (
    <div className="h-full flex flex-col items-start">
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="mb-4 text-2xl">{todoData?.displayName}</h1>
          <Button isIconOnly variant="light" size="sm" onClick={onOpen}>
            <MoreIcon theme="outline" size={18} className="dark:text-white" />
          </Button>
        </div>
        {todoData?.id && <CreateTask todoId={todoData.id} afterCreate={refreshTaskList} />}
      </div>
      <ScrollShadow hideScrollBar className="flex-1 overflow-auto h-full w-full">
        <Spin loading={loading}>
          <Listbox
            aria-label={`${todoData?.displayName ?? ""}任务列表`}
            onAction={key => alert(key)}
            className="p-0 rounded-none"
            itemClasses={{
              base: "px-4 gap-4 h-12",
            }}
          >
            {processTasks.map(item => (
              <ListboxItem
                key={item.id as string}
                // startContent={

                // }
              >
                <Checkbox color="success" size="md">
                  {item.title}
                </Checkbox>
              </ListboxItem>
            ))}
          </Listbox>
        </Spin>
      </ScrollShadow>
      <Modal isOpen={isOpen} placement="bottom" scrollBehavior="inside" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>✅ 已完成任务</ModalHeader>
              <ModalBody className="px-2">
                <ScrollShadow hideScrollBar className="flex-1">
                  <Listbox
                    aria-label="completed tasks"
                    onAction={key => alert(key)}
                    className="p-0 rounded-none"
                    itemClasses={{
                      base: "px-4 gap-4 h-12",
                    }}
                  >
                    {completedTasks.map(item => (
                      <ListboxItem
                        key={item.id as string}
                        className="h-auto"
                        startContent={(
                          <Checkbox
                            defaultSelected
                            lineThrough
                            color="success"
                            size="md"
                            classNames={{
                              label: "text-wrap break-all",
                            }}
                          >
                            {item.title}
                          </Checkbox>
                        )}
                      />
                    ))}
                  </Listbox>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TodoTaskList;
