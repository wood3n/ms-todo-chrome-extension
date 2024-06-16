import { getTaskList } from "@/api";
import { useTodoList } from "@/context";
import { List as ListIcon } from "@icon-park/react";
import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import { useRequest } from "ahooks";
import CreateTask from "./create";

const TodoTaskList = () => {
	const todos = useTodoList((state) => state.todoList);

	const pinnedTodoList = todos?.find((item) => item.pinned);

	const { data: tasks, refreshAsync: refreshTaskList } = useRequest(
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

	return (
		<div className="h-full flex flex-col items-start">
			{pinnedTodoList?.id && (
				<CreateTask
					todoListId={pinnedTodoList.id}
					afterCreate={refreshTaskList}
				/>
			)}
			<ScrollShadow hideScrollBar className="flex-1 overflow-auto w-full">
				<Listbox
					aria-label="任务列表"
					onAction={(key) => alert(key)}
					className="p-0 rounded-none"
					itemClasses={{
						base: "px-4 gap-4 h-12",
					}}
				>
					{tasks.map((item) => (
						<ListboxItem
							key={item.id as string}
							startContent={<ListIcon theme="outline" size={14} fill="#333" />}
						>
							{item.title}
						</ListboxItem>
					))}
				</Listbox>
			</ScrollShadow>
		</div>
	);
};

export default TodoTaskList;
