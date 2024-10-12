import { useState } from "react";

import { AddTwo as AddTwoIcon } from "@icon-park/react";
import { Input, Kbd } from "@nextui-org/react";

import { createTask } from "@/api";

interface Props {
  todoId: string;
  afterCreate: VoidFunction;
}

const CreateTask: React.FC<Props> = ({ todoId, afterCreate }) => {
  const [value, setValue] = useState<string>();

  const submit = async () => {
    await createTask(todoId, { title: value });
    setValue(undefined);
    afterCreate();
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="flex w-full items-center gap-x-2 pb-4">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        startContent={<AddTwoIcon theme="outline" size="16" fill="#333" />}
        endContent={<Kbd keys={["enter"]} className="" />}
        placeholder="添加任务"
        onKeyDown={handlePressEnter}
      />
    </div>
  );
};

export default CreateTask;
