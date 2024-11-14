import type { ZonedDateTime } from "@internationalized/date";
import { parseAbsoluteToLocal } from "@internationalized/date";

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

/** parse iso time to local time string: YYYY-MM-DD HH:mm */
export function formatISOTime(datetime: string) {
  return parseAbsoluteToLocal(`${datetime}Z`).toDate().toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** parse iso datetime to local datetime */
export function parseLocalDate(datetime: string) {
  return parseAbsoluteToLocal(`${datetime}Z`);
}

/** get datetime millisecond */
export function parseTimestamp(zonedate: ZonedDateTime) {
  return zonedate.toDate().getTime();
}

export function parseUTCTimeStr(zonedate: ZonedDateTime) {
  return zonedate.toDate().toISOString();
}
