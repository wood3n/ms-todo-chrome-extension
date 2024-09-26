import type React from "react";
import { useTodoList } from "@/context";
import { AddTwo as AddTwoIcon } from "@icon-park/react";
import { Button, Input, Kbd } from "@nextui-org/react";
import { useState } from "react";

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
    <div className="w-full py-4 flex items-center gap-x-2">
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
