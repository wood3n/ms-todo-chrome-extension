import React, { useState } from "react";

import { parseDateTime } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";

import { useTodoList } from "@/context";
import { convertUTCToLocalTime } from "@/utils/date";

interface Props {
  task: TodoTask;
}

const EndTime = ({ task }: Props) => {
  const todoData = useTodoList(state => state.currentTodoData);
  const [value, setValue] = useState(parseDateTime(task.reminderDateTime!.dateTime!));

  // return (
  //   <DatePicker
  //     variant="flat"
  //     hideTimeZone
  //     size="sm"
  //     hourCycle={24}
  //     startContent={<span className="text-sm">⏰</span>}
  //     granularity="minute"
  //     showMonthAndYearPickers
  //     selectorIcon={null}
  //     className="w-auto"
  //     classNames={{
  //       selectorButton: "h-4 min-w-4 w-4",
  //       selectorIcon: "h-3 w-3",
  //     }}
  //     dateInputClassNames={{
  //       input: "text-sm",
  //       inputWrapper: "min-h-6 h-6",
  //     }}
  //     minValue={today(getLocalTimeZone())}
  //     value={value}
  //     onChange={(v) => {
  //       setValue(v);
  //     }}
  //   />
  // );

  return (
    <div className="space-x-1 p-2 text-xs text-gray-500">
      <span>⏰</span>
      <span>{convertUTCToLocalTime(task.reminderDateTime!.dateTime!)}</span>
    </div>
  );
};

export default EndTime;
