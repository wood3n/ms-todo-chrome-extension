import type { TodoTask } from "@microsoft/microsoft-graph-types";

import { parseLocalDate, parseTimestamp } from "./date";

interface CreateAlarmOptions {
  task: TodoTask;
}

export async function createNotification({ task }: CreateAlarmOptions) {
  const alarm = await chrome.alarms.get(task.id);
  const when = parseTimestamp(parseLocalDate(task.reminderDateTime!.dateTime!));

  if (!alarm && when > Date.now()) {
    chrome.alarms.onAlarm.addListener(() => {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "extension_icon@128px.png",
        title: task.title!,
        message: "To Do",
        priority: 2,
      });
    });

    chrome.alarms.create(task.id!, { when });
  }
}

export async function clearNotification(taskId: string) {
  const alarm = await chrome.alarms.get(taskId);

  if (alarm) {
    chrome.alarms.clear(taskId);
  }
}
