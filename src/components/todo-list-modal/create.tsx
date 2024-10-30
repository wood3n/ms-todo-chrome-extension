import { useState } from "react";
import type React from "react";

import { AddTwo as AddTwoIcon } from "@icon-park/react";
import { Button, Input, Kbd } from "@nextui-org/react";

import { useTodoList } from "@/context";

interface Props {
  className?: string;
}

const CreateTodoList: React.FC<Props> = ({ className }) => {
  const addTodoList = useTodoList(state => state.addTodo);

  const [value, setValue] = useState<string>();

  const submit = () => {
    if (value?.trim()) {
      addTodoList(value);
    }
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2 py-4">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        endContent={<Kbd keys={["enter"]} />}
        placeholder="添加任务列表"
        className={className}
        onKeyDown={handlePressEnter}
      />
      <Button isIconOnly color="primary" variant="flat" onClick={submit}>
        <AddTwoIcon theme="outline" size="16" fill="#333" />
      </Button>
    </div>
  );
};

export default CreateTodoList;
