import React from "react";

import { parseDateTime } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { DatePicker } from "@nextui-org/react";

interface Props {
  task: TodoTask;
}

const RemindTime = ({ task }: Props) => {
  if (!task?.reminderDateTime?.dateTime) {
    return null;
  }

  const isOutDate = new Date(task.reminderDateTime.dateTime!).getTime() < Date.now();

  return (
    <DatePicker
      startContent="⏰"
      label={false}
      showMonthAndYearPickers
      hideTimeZone
      size="sm"
      granularity="minute"
      color={isOutDate ? "warning" : "primary"}
      value={parseDateTime(task.reminderDateTime.dateTime)}
      onChange={(value) => {

      }}
      classNames={{
        selectorButton: "h-6 w-6 min-w-6",
        selectorIcon: "h-4 w-4 min-w-4",
      }}
      dateInputClassNames={{
        inputWrapper: "min-h-6 h-6",
        input: "text-xs",
      }}
    />
  );
};

export default RemindTime;
