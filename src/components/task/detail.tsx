import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import type { CalendarDateTime } from "@internationalized/date";
import { getLocalTimeZone, parseDateTime, today } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";

interface Props {
  data?: TodoTask;
  onSave: (data: TodoTask) => Promise<void>;
}

interface FormValues {
  title: string;
  body: {
    content: string | null;
  };
  reminderDateTime: {
    dateValue: CalendarDateTime | null;
  };
  dueDateTime: {
    dateValue: CalendarDateTime | null;
  };
}

const TaskDetail = ({
  data,
  onSave,
}: Props) => {
  const isCompleted = data?.status === "completed";

  const { register, control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: data?.title as string,
      body: {
        content: data?.body?.content,
      },
      reminderDateTime: {
        dateValue: data?.reminderDateTime?.dateTime ? parseDateTime(data.reminderDateTime.dateTime) : null,
      },
      dueDateTime: {
        dateValue: data?.dueDateTime?.dateTime ? parseDateTime(data.dueDateTime.dateTime) : null,
      },
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const { title, body, reminderDateTime, dueDateTime } = values;

    return onSave({
      title,
      body,
      reminderDateTime: reminderDateTime.dateValue
        ? {
            dateTime: reminderDateTime.dateValue.toString(),
            timeZone: getLocalTimeZone(),
          }
        : null,
      dueDateTime: dueDateTime.dateValue
        ? {
            dateTime: dueDateTime.dateValue.toString(),
            timeZone: getLocalTimeZone(),
          }
        : null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Controller
        name="title"
        control={control}
        rules={{
          required: "请输入任务标题",
        }}
        render={({ field, fieldState }) => {
          return (
            <Input
              label="标题"
              isRequired
              disabled={isCompleted}
              placeholder="请输入内容标题"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState?.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            isDisabled={isCompleted}
            label="⏰ 提醒时间"
            value={value}
            onChange={onChange}
            showMonthAndYearPickers
            hideTimeZone
            hourCycle={24}
            minValue={today(getLocalTimeZone())}
            granularity="minute"
          />
        )}
        name="reminderDateTime.dateValue"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label="⌛ 截止时间"
            value={value}
            isDisabled={isCompleted}
            onChange={onChange}
            showMonthAndYearPickers
            hideTimeZone
            hourCycle={24}
            minValue={today(getLocalTimeZone())}
            granularity="minute"
          />
        )}
        name="dueDateTime.dateValue"
      />
      <Textarea
        label="备注"
        placeholder="请输入备注"
        isDisabled={isCompleted}
        {...register("body.content")}
      />
      {!isCompleted && (
        <div className="flex justify-center space-x-2">
          <Button type="submit" color="primary" className="flex-1">保 存</Button>
          <Button color="danger" className="flex-1">删除</Button>
        </div>
      )}
    </form>
  );
};

export default TaskDetail;
