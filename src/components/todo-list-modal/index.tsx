import { Modal, ModalContent } from "@nextui-org/react";

import { useTodoList } from "@/context";

import ListItem from "./list-item";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

/** 任务列表 */
const TodoListModal = ({ isOpen, onOpenChange }: Props) => {
  const todoList = useTodoList(store => store.todoList);

  const defaultList = todoList.filter(item => item.wellknownListName === "defaultList");
  const selfCreatedList = todoList.filter(item => item.wellknownListName !== "defaultList");

  console.log("todoList>>", todoList);

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="p-2">
        {(onClose) => {
          return (
            <>
              {Boolean(defaultList?.length) && (
                <div>
                  {defaultList.map(item => (
                    <ListItem key={item.id} name={item.displayName!} />
                  ))}
                </div>
              )}
              {
                Boolean(selfCreatedList?.length) && (
                  <div>
                    {selfCreatedList.map(item => (
                      <ListItem key={item.id} name={item.displayName!} />
                    ))}
                  </div>
                )
              }
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default TodoListModal;
