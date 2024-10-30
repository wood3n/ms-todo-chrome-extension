import type { CalendarDateTime } from "@internationalized/date";

interface CreateAlarmOptions {
  taskId: string;
  dateValue: CalendarDateTime;
}

/**
 * 指定时间提醒
 */
export class TaskAlarm {
  constructor() {
    chrome.alarms.onAlarm.addListener(this.handleAlarm);
  }

  handleAlarm(alarm: chrome.alarms.Alarm) {
    chrome.notifications.create({
      type: "basic",
      title: "提醒",
      message: `这是你的提醒，闹钟名：${alarm.name}`,
    });
  }

  create({ taskId, dateValue }: CreateAlarmOptions) {
    chrome.alarms.create(taskId, { when: dateValue.millisecond });
  }

  clear(taskId: string) {
    chrome.alarms.clear(taskId);
  }
}
