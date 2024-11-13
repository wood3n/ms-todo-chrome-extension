import { CalendarDate, Time } from "@internationalized/date";

export function getLocalDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // 格式化当前日期和时间
  return formatter.format(now);
}

export function convertUTCToLocalTime(utcDateString: string) {
  return new Date(utcDateString).toLocaleString();
}

/** 获取日期 get date */
export function getDateFromISO(datetime: string) {
  const date = new Date(datetime);

  return new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getTimeFromISO(datetime: string) {
  const date = new Date(datetime);

  return new Time(date.getHours(), date.getSeconds());
}
