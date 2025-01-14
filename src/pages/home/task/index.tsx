import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CloseRemind, Upload as UploadIcon } from "@icon-park/react";
import type { ZonedDateTime } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { TodoTask } from "@microsoft/microsoft-graph-types";
import { Button, Chip, DatePicker, Input, Modal, ModalContent, ModalFooter, ModalHeader, Textarea, Tooltip } from "@nextui-org/react";

import ScrollContainer from "@/components/scroll-container";
import { parseLocalDate, parseTimestamp, parseUTCTimeStr } from "@/utils/date";

import TaskAttachment from "../task-attachment";

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
  const { t } = useTranslation();

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
        <ModalContent className="overflow-hidden">
          <ModalHeader>{t("taskInfo")}</ModalHeader>
          <ScrollContainer
            className="min-h-0 flex-1 px-6 py-2"
            classNames={{
              contentEl: "flex flex-col space-y-2",
            }}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: t("enterTaskTitle"),
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    label={t("title")}
                    isRequired
                    labelPlacement="outside"
                    isReadOnly={isReadOnly}
                    placeholder={t("enterTaskTitle")}
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState?.error?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
            <Textarea
              label={t("remark")}
              placeholder={t("enterRemark")}
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
                        {t("reminderTime")}
                        {isOutDate && <Chip color="warning" variant="light">{t("expired")}</Chip>}
                      </div>
                    )}
                    startContent={!isReadOnly && value && (
                      <Tooltip content={t("cancelReminder")} closeDelay={0} size="sm">
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
            <TaskAttachment
              task={data}
              listClassName="max-h-40"
              uploadButton={(
                <div className="inline-flex cursor-pointer items-center space-x-2">
                  <span className="text-sm">
                    {t("attachment")}
                  </span>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    radius="full"
                    className="h-5 min-h-5"
                    onPressStart={e => e.continuePropagation()}
                  >
                    <UploadIcon />
                  </Button>
                </div>
              )}
            />
          </ScrollContainer>
          {!isReadOnly
          && (
            <ModalFooter>
              <Button
                color="danger"
                className="flex-1"
                onClick={onDelete}
                isLoading={loading}
              >
                {t("delete")}
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                className="flex-1"
              >
                {t("save")}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

export default Task;
