import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

import NameInput from "@/components/name-input";
import SpinContainer from "@/components/spin-container";
import { useTodoList } from "@/context";

import ListItem from "./list-item";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

/** 任务列表 */
const TodoListModal = ({ isOpen, onOpenChange }: Props) => {
  const todoList = useTodoList(store => store.todoList);
  const currentTodoData = useTodoList(store => store.currentTodoData);
  const updateTodo = useTodoList(store => store.updateTodo);
  const toggleTodo = useTodoList(store => store.toggleTodo);
  const pinTodo = useTodoList(store => store.pinTodo);
  const createTodo = useTodoList(store => store.addTodo);
  const deleteTodo = useTodoList(store => store.deleteTodo);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="pb-1">{t("Task classification")}</ModalHeader>
              <SpinContainer loading={loading}>
                <ModalBody className="p-2">
                  {todoList?.map(item => (
                    <ListItem
                      key={item.id}
                      data={item}
                      isSelected={item.id === currentTodoData.id}
                      onToggle={() => {
                        toggleTodo(item.id!);
                        onClose();
                      }}
                      onPinned={async () => {
                        await pinTodo(item.id!);
                        onClose();
                      }}
                      onUpdate={async (name) => {
                        setLoading(true);
                        try {
                          await updateTodo(item.id!, name);
                        }
                        finally {
                          setLoading(false);
                        }
                      }}
                      onDelete={async () => {
                        setLoading(true);
                        try {
                          await deleteTodo(item.id!);
                        }
                        finally {
                          setLoading(false);
                        }
                      }}
                    />
                  ))}
                </ModalBody>
              </SpinContainer>
              <ModalFooter className="p-2">
                <NameInput
                  placeholder={t("Create Task classification")}
                  onSubmit={async (name) => {
                    setLoading(true);
                    try {
                      await createTodo(name);
                    }
                    finally {
                      setLoading(false);
                    }
                  }}
                />
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default TodoListModal;
