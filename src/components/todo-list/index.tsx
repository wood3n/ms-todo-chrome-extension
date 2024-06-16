import { useTodoList } from "@/context";
import { List as ListIcon, Pin as PinIcon } from "@icon-park/react";
import { Listbox, ListboxItem, ScrollShadow, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserCard from "../user-card";
import CreateTodoList from "./create";

/** 任务列表 */
const TodoList = () => {
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>();
	const todos = useTodoList((state) => state.todoList);

	useEffect(() => {
		const selectedKey = todos?.find((item) => item.pinned)?.id as string;

		setSelectedKeys(new Set([selectedKey]));
	}, [todos]);

	if (!todos?.length) {
		return;
	}

	return (
		<div className="h-full flex flex-col items-start">
			<UserCard />
			<CreateTodoList />
			<ScrollShadow hideScrollBar className="flex-1 overflow-auto w-full">
				<Listbox
					aria-label="任务分类列表"
					onAction={(key) => alert(key)}
					className="p-0 rounded-none"
					itemClasses={{
						base: "px-4 gap-4 h-12",
					}}
					selectionMode="single"
					items={todos}
					selectedKeys={selectedKeys}
					onSelectionChange={(keys) => {
						setSelectedKeys(keys as Set<string>);
					}}
				>
					{todos.map((item) => (
						<ListboxItem
							key={item.id as string}
							startContent={<ListIcon theme="outline" size={14} fill="#333" />}
							selectedIcon={({ isSelected }) =>
								isSelected && <PinIcon theme="outline" size={14} fill="#333" />
							}
						>
							{item.displayName}
						</ListboxItem>
					))}
				</Listbox>
			</ScrollShadow>
		</div>
	);
};

export default TodoList;
