import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";

import { CloseRemind } from "@icon-park/react";
import type { ZonedDateTime } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, Chip, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Tooltip } from "@nextui-org/react";

import { parseLocalDate, parseTimestamp, parseUTCTimeStr } from "@/utils/date";

import SpinContainer from "../../../components/spin-container";
import TaskAttachment from "./task-attachment";

interface Props {
  data: TodoTask;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: TodoTask) => Promise<void>;
  onDelete: VoidFunction;
}

interface FormValues {
  title: string;
  body: {
    content: string | null;
  };
  reminderDateTime: {
    dateValue: ZonedDateTime | null;
  };
}

const Task = ({
  data,
  isOpen,
  onOpenChange,
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
        dateValue: data?.reminderDateTime?.dateTime ? parseLocalDate(data.reminderDateTime.dateTime) : null,
      },
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { title, body, reminderDateTime } = values;

    setLoading(true);
    try {
      await onSave({
        title,
        body,
        isReminderOn: !!reminderDateTime.dateValue,
        reminderDateTime: reminderDateTime.dateValue
          ? {
              dateTime: parseUTCTimeStr(reminderDateTime.dateValue),
              timeZone: "UTC",
            }
          : null,
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>任务信息</ModalHeader>
          <ModalBody>
            <SpinContainer loading={loading} className="flex flex-col space-y-4 overflow-y-hidden">
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
                  const isOutDate = value && (parseTimestamp(value) < Date.now());

                  return (
                    <DatePicker
                      isReadOnly={isReadOnly}
                      label={(
                        <div>
                          ⏰ 提醒时间
                          {isOutDate && <Chip color="warning" variant="light">已过期</Chip>}
                        </div>
                      )}
                      startContent={!isReadOnly && value && (
                        <Tooltip content="取消提醒" closeDelay={0} size="sm">
                          <Button
                            onClick={() => {
                              setValue("reminderDateTime.dateValue", null);
                            }}
                            isIconOnly
                            radius="full"
                            size="sm"
                            variant="flat"
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
              <TaskAttachment task={data} />
            </SpinContainer>
          </ModalBody>
          {!isReadOnly
          && (
            <ModalFooter>
              <Button type="submit" color="primary" className="flex-1">保 存</Button>
              <Button
                color="danger"
                className="flex-1"
                onClick={onDelete}
              >
                删除
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

export default Task;
