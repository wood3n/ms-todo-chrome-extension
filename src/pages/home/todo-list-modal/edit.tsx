import React, { useEffect, useState } from "react";

import type { TodoTaskList } from "@microsoft/microsoft-graph-types";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

import NameInput from "@/components/name-input";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: TodoTaskList;
  onSubmit: (name: string) => Promise<void>;
}

const EditItem = ({ data, isOpen, onOpenChange, onSubmit }: Props) => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.displayName) {
      setValue(data.displayName);
    }
  }, [data.displayName]);

  const handleSubmit = async () => {
    if (value?.trim()) {
      setLoading(true);
      try {
        await onSubmit(value.trim());
        onOpenChange(false);
      }
      finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal placement="center" isDismissable={false} isKeyboardDismissDisabled isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>编辑名称</ModalHeader>
        <ModalBody>
          <NameInput
            autoFocus
            initialValue={data?.displayName}
            onChange={setValue}
            onSubmit={handleSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            isLoading={loading}
            color="primary"
            onClick={handleSubmit}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditItem;
