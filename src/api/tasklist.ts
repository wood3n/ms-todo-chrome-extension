import request from "./request";

/**
 * https://learn.microsoft.com/zh-cn/graph/api/resources/todotask?view=graph-rest-1.0
 */
export interface TaskList {
	value?: Value[];
}

export interface Value {
	/** 任务的重要性 */
	importance?: "low" | "normal" | "high";
	/** 如果设置警报以提醒用户有任务，则设置为 true。 */
	isReminderOn?: boolean;
	/**
	 * 指示任务的状态或进度
	 *
	 * notStarted: 未开始
	 *
	 * inProgress：进行中
	 *
	 * completed：已完成
	 *
	 * waitingOnOthers：等待其他任务
	 *
	 * deferred：延期
	 */
	status?:
		| "notStarted"
		| "inProgress"
		| "completed"
		| "waitingOnOthers"
		| "deferred";
	/** 任务标题 */
	title?: string;
	/**
	 * 任务的创建日期和时间； 默认情况下，它采用 UTC 格式
	 */
	createdDateTime?: Date;
	/** 上次修改任务的日期和时间 */
	lastModifiedDateTime?: Date;
	/** 指示任务是否具有附件 */
	hasAttachments?: boolean;
	/** 与任务关联的类别；每个类别对应于用户定义的 outlookCategory 的 displayName 属性 */
	categories?: string[];
	/** 任务的唯一标识符 */
	id?: string;
	/** 通常包含有关任务的信息的任务正文 */
	body?: Body;
	/** 任务完成的指定时区中的日期和时间，UTC时间 */
	completedDateTime?: CompletedDateTime;
}

export interface Body {
	/** 项目的内容 */
	content?: string;
	/** 内容的类型 */
	contentType?: "text" | "html";
}

export interface CompletedDateTime {
	/** 日期和时间组合表示形式的单个时间点（{date}T{time}；例如 2017-08-29T04:00:00.0000000） */
	dateTime?: Date;
	/** 时区 */
	timeZone?: string;
}

/**
 * 获取任务列表中的任务
 */
export const getTaskList = (todoTaskListId: string) =>
	request.get<TaskList>(`/me/todo/lists/${todoTaskListId}/tasks`);
