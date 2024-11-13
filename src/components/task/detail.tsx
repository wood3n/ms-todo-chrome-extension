import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import { CloseRemind } from "@icon-park/react";
import type { CalendarDateTime } from "@internationalized/date";
import { getLocalTimeZone, parseDateTime, today } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, Chip, DatePicker, Input, Textarea, Tooltip } from "@nextui-org/react";

import SpinContainer from "../spin-container";

interface Props {
  data?: TodoTask;
  onSave: (data: TodoTask) => Promise<void>;
  onDelete: VoidFunction;
}

interface FormValues {
  title: string;
  body: {
    content: string | null;
  };
  reminderDateTime: {
    dateValue: CalendarDateTime | null;
  };
}

const TaskDetail = ({
  data,
  onSave,
  onDelete,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const isReadOnly = data?.status === "completed";

  const { register, setValue, control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: data?.title as string,
      body: {
        content: data?.body?.content,
      },
      reminderDateTime: {
        dateValue: data?.reminderDateTime?.dateTime ? parseDateTime(data.reminderDateTime.dateTime) : null,
      },
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
    const { title, body, reminderDateTime } = values;

    setLoading(true);
    try {
      await onSave({
        title,
        body,
        isReminderOn: !!reminderDateTime.dateValue,
        reminderDateTime: reminderDateTime.dateValue
          ? {
              dateTime: reminderDateTime.dateValue.toString(),
              timeZone: getLocalTimeZone(),
            }
          : null,
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <SpinContainer loading={loading}>
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
                labelPlacement="outside"
                isReadOnly={isReadOnly}
                placeholder="请输入内容标题"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState?.error?.message}
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
        <Textarea
          label="备注"
          placeholder="请输入备注"
          labelPlacement="outside"
          readOnly={isReadOnly}
          {...register("body.content")}
        />
        <Controller
          name="reminderDateTime.dateValue"
          control={control}
          render={({ field: { onChange, value } }) => {
            const isOutDate = value && new Date(value.toString()).getTime() < Date.now();

            return (
              <DatePicker
                isReadOnly={isReadOnly}
                label={(
                  <div>
                    ⏰ 提醒时间
                    {isOutDate && <Chip color="warning" variant="light">已过期</Chip>}
                  </div>
                )}
                startContent={!isReadOnly && (
                  <Tooltip content="取消提醒" closeDelay={0} size="sm">
                    <Button
                      onClick={() => {
                        setValue("reminderDateTime.dateValue", null);
                      }}
                      isIconOnly
                      radius="full"
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="h-6 min-h-6 w-6 min-w-6"
                    >
                      <CloseRemind fill="currentColor" />
                    </Button>
                  </Tooltip>
                )}
                labelPlacement="outside"
                value={value}
                color={isOutDate ? "warning" : "default"}
                onChange={onChange}
                showMonthAndYearPickers
                hideTimeZone
                hourCycle={24}
                isInvalid={false}
                minValue={today(getLocalTimeZone())}
                granularity="minute"
              />
            );
          }}
        />
        {!isReadOnly && (
          <div className="flex justify-center space-x-2">
            <Button type="submit" color="primary" className="flex-1">保 存</Button>
            <Button
              color="danger"
              className="flex-1"
              onClick={onDelete}
            >
              删除
            </Button>
          </div>
        )}
      </form>
    </SpinContainer>
  );
};

export default TaskDetail;
