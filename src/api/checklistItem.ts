import request from "./request";

/**
 * https://learn.microsoft.com/zh-cn/graph/api/resources/checklistitem?view=graph-rest-1.0#properties
 */
export interface ChecklistItems {
  value?: Value[];
}

export interface Value {
  /** 标题 */
  displayName?: string;
  /** 创建时间 */
  createdDateTime?: Date;
  /** 是否已完成 */
  isChecked?: boolean;
  /** id */
  id?: string;
}

/** 获取任务的清单  */
export function getChecklistItems({ todoTaskListId, todoTaskId, checklistItems }: { todoTaskListId: string; todoTaskId: string; checklistItems?: string }) {
  return request.get<ChecklistItems>(`/me/todo/lists/${todoTaskListId}/tasks/${todoTaskId}/checklistItems${checklistItems ? `/${checklistItems}` : ""}`);
}
