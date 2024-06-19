import Spin from "@/components/spin";
import { useTodoList } from "@/context";
import { List as ListIcon, Pin as PinIcon } from "@icon-park/react";
import {
	Listbox,
	ListboxItem,
	ListboxSection,
	ScrollShadow,
} from "@nextui-org/react";
import clx from "classnames";
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

	const defaultTodos = todos.filter(
		(item) => item.wellknownListName === "defaultList",
	);
	const customTodos = todos.filter((item) => item.wellknownListName === "none");

	return (
		<div className="h-full flex flex-col items-start">
			<UserCard />
			<CreateTodoList />
			<Spin className="w-full flex-1">
				<ScrollShadow hideScrollBar className="overflow-auto ">
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
						<ListboxSection showDivider>
							{defaultTodos.map((item) => (
								<ListboxItem
									key={item.id as string}
									startContent={
										<ListIcon theme="outline" size={14} fill="#333" />
									}
									selectedIcon={({ isSelected }) =>
										isSelected && (
											<PinIcon theme="outline" size={14} fill="#333" />
										)
									}
									shouldHighlightOnFocus={false}
									className={clx("hover:bg-blue-300", {
										"bg-blue-200": selectedKeys?.has(item.id as string),
									})}
								>
									{item.displayName}
								</ListboxItem>
							))}
						</ListboxSection>
						<ListboxSection>
							{customTodos.map((item) => (
								<ListboxItem
									key={item.id as string}
									startContent={
										<ListIcon theme="outline" size={14} fill="#333" />
									}
									selectedIcon={({ isSelected }) =>
										isSelected && (
											<PinIcon theme="outline" size={14} fill="#333" />
										)
									}
									shouldHighlightOnFocus={false}
									className={clx("hover:bg-blue-300", {
										"bg-blue-300": selectedKeys?.has(item.id as string),
									})}
								>
									{item.displayName}
								</ListboxItem>
							))}
						</ListboxSection>
					</Listbox>
				</ScrollShadow>
			</Spin>
		</div>
	);
};

export default TodoList;
