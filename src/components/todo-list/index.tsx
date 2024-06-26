import { useTodoList } from "@/context";
import {
	Listbox,
	ListboxItem,
	ListboxSection,
	ScrollShadow,
} from "@nextui-org/react";
import clx from "classnames";
import UserCard from "../user-card";
import CreateTodoList from "./create";
import ListItem from "./list-item";

interface Props {
	onClose: VoidFunction;
}

/** 任务列表 */
const TodoList = ({ onClose }: Props) => {
	const [currentTodoData, changeCurrentTodoData] = useTodoList((state) => [
		state.currentTodoData,
		state.changeCurrentTodo,
	]);
	const todos = useTodoList((state) => state.todoList);

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
			<ScrollShadow hideScrollBar className="w-full overflow-auto">
				<Listbox
					aria-label="任务分类列表"
					onAction={(key) => alert(key)}
					className="p-0 rounded-none"
					itemClasses={{
						base: "px-4 gap-4 h-12",
					}}
					selectionMode="single"
					items={todos}
					selectedKeys={
						currentTodoData.id ? new Set([currentTodoData.id]) : undefined
					}
					onSelectionChange={(keys) => {
						changeCurrentTodoData([...keys][0] as string);
						onClose();
					}}
				>
					<ListboxSection showDivider>
						{defaultTodos.map((item) => (
							<ListboxItem
								key={item.id as string}
								hideSelectedIcon
								className={clx({
									"bg-blue-200": currentTodoData.id === item.id,
								})}
								classNames={{
									title: "inline-block h-full",
								}}
							>
								<ListItem>{item.displayName}</ListItem>
							</ListboxItem>
						))}
					</ListboxSection>
					<ListboxSection>
						{customTodos.map((item) => (
							<ListboxItem
								key={item.id as string}
								hideSelectedIcon
								className={clx("hover:bg-blue-300", {
									"bg-blue-300": currentTodoData.id === item.id,
								})}
								classNames={{
									title: "inline-block h-full",
								}}
							>
								<ListItem>{item.displayName}</ListItem>
							</ListboxItem>
						))}
					</ListboxSection>
				</Listbox>
			</ScrollShadow>
		</div>
	);
};

export default TodoList;
