import { createTask } from "@/api";
import { AddTwo as AddTwoIcon } from "@icon-park/react";
import { Button, Input, Kbd } from "@nextui-org/react";
import { useState } from "react";

interface Props {
	todoListId: string;
	afterCreate: VoidFunction;
}

const CreateTask: React.FC<Props> = ({ todoListId, afterCreate }) => {
	const [value, setValue] = useState<string>();

	const submit = async () => {
		await createTask(todoListId, { title: value });
		setValue(undefined);
		afterCreate();
	};

	const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = (
		e,
	) => {
		if (e.key === "Enter") {
			submit();
		}
	};

	return (
		<div className="w-full pb-4 flex items-center gap-x-2">
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				startContent={<AddTwoIcon theme="outline" size="16" fill="#333" />}
				endContent={<Kbd keys={["enter"]} className="" />}
				placeholder="添加任务"
				onKeyDown={handlePressEnter}
			/>
		</div>
	);
};

export default CreateTask;
