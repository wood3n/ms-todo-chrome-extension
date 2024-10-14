import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import { parseDateTime } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import type { DateValue } from "@nextui-org/react";
import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";

interface Props {
  data?: TodoTask;
}

interface FormValues {
  title: string;
  body: {
    content: string | null;
  };
  reminderDateTime: {
    dateValue: DateValue | null;
  };
  dueDateTime: {
    dateValue: DateValue | null;
  };
}

const TaskDetail = ({
  data,
}: Props) => {
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

  const onSubmit: SubmitHandler<FormValues> = values => console.log(values);

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
            label="⏰ 提醒时间"
            value={value}
            onChange={onChange}
            showMonthAndYearPickers
            hideTimeZone
            hourCycle={24}
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
            onChange={onChange}
            showMonthAndYearPickers
            hideTimeZone
            hourCycle={24}
            granularity="minute"
          />
        )}
        name="dueDateTime.dateValue"
      />
      <Textarea
        label="备注"
        placeholder="请输入备注"
        {...register("body.content")}
      />
      <Button type="submit" color="primary">提交</Button>
    </form>
  );
};

export default TaskDetail;
