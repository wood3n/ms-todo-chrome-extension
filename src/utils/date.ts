export const getLocalDate = () => {
	const now = new Date();
	const formatter = new Intl.DateTimeFormat("default", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// 格式化当前日期和时间
	return formatter.format(now);
};
