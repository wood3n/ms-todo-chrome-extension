import { getTaskList } from "@/api";
import Spin from "@/components/spin";
import { useTodoList } from "@/context";
import { List as ListIcon } from "@icon-park/react";
import {
	Accordion,
	AccordionItem,
	Button,
	Checkbox,
	Listbox,
	ListboxItem,
	ScrollShadow,
} from "@nextui-org/react";
import { useRequest } from "ahooks";
import CreateTask from "./create";

const TodoTaskList = () => {
	const todos = useTodoList((state) => state.todoList);

	const pinnedTodoList = todos?.find((item) => item.pinned);

	const {
		data: tasks,
		refreshAsync: refreshTaskList,
		loading,
	} = useRequest(
		async () => {
			if (pinnedTodoList?.id) {
				const res = await getTaskList(pinnedTodoList.id);

				return res?.value;
			}

			return null;
		},
		{
			refreshDeps: [pinnedTodoList?.id],
		},
	);

	if (!tasks?.length) {
		return null;
	}

	const processTasks = tasks.filter((item) => item.status !== "completed");
	const completedTasks = tasks.filter((item) => item.status === "completed");

	return (
		<div className="h-full flex flex-col items-start">
			{pinnedTodoList?.id && (
				<CreateTask
					todoListId={pinnedTodoList.id}
					afterCreate={refreshTaskList}
				/>
			)}
			<ScrollShadow
				hideScrollBar
				className="flex-1 overflow-auto h-full w-full"
			>
				<Spin loading={loading}>
					<Listbox
						aria-label="任务列表"
						onAction={(key) => alert(key)}
						className="p-0 rounded-none"
						itemClasses={{
							base: "px-4 gap-4 h-12",
						}}
					>
						{processTasks.map((item) => (
							<ListboxItem
								key={item.id as string}
								startContent={<Checkbox color="success" size="md" />}
							>
								{item.title}
							</ListboxItem>
						))}
					</Listbox>
					<Accordion variant="splitted">
						<AccordionItem key="1" aria-label="completed tasks" title="已完成">
							<Listbox
								aria-label="completed tasks"
								onAction={(key) => alert(key)}
								className="p-0 rounded-none"
								itemClasses={{
									base: "px-4 gap-4 h-12",
								}}
							>
								{completedTasks.map((item) => (
									<ListboxItem
										key={item.id as string}
										startContent={
											<Checkbox
												defaultSelected
												lineThrough
												color="success"
												size="md"
											/>
										}
									>
										{item.title}
									</ListboxItem>
								))}
							</Listbox>
						</AccordionItem>
					</Accordion>
				</Spin>
			</ScrollShadow>
		</div>
	);
};

export default TodoTaskList;
