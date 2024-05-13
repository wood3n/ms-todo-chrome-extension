import request from "./request";

/**
 * https://learn.microsoft.com/en-us/graph/api/resources/todotasklist?view=graph-rest-1.0
 */
export interface TodoList {
	value?: Value[];
}

export interface Value {
	/** 任务列表的名称 */
	displayName?: string;
	/** 如果用户是给定任务列表的所有者，则为 True */
	isOwner?: boolean;
	/** 任务列表是否与其他用户共享 */
	isShared?: boolean;
	/**
	 * 如果给定列表是已知列表，则指示列表名称的属性
	 *
	 * defaultList：内置任务列表。
	 *
	 * flaggedEmails	内置的已标记电子邮件列表。 此列表中存在标记电子邮件中的任务。
	 *
	 * unknownFutureValue	可演变枚举 sentinel 值，请勿使用。
	 */
	wellknownListName?: "defaultList" | "flaggedEmails" | "unknownFutureValue";
	/** 任务列表的标识符 */
	id?: string;
}

export const getTodoList = () => request.get<TodoList>("/me/todo/lists");
