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
