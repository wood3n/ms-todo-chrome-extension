import React from "react";

import { Tab, Tabs } from "@nextui-org/react";

export type Status = "inProgress" | "completed";

interface Props {
  status: Status;
  onChange: (status: Status) => void;
}

const TaskStatusTabs = ({
  status,
  onChange,
}: Props) => {
  const tabs = [
    {
      label: "⏳ 进行中",
      key: "inProgress",
    },
    {
      label: "✅ 已完成",
      key: "completed",
    },
  ];

  return (
    <Tabs
      size="sm"
      color="primary"
      selectedKey={status}
      onSelectionChange={key => onChange(key as Status)}
    >
      {tabs.map(item => (
        <Tab key={item.key} title={item.label} />
      ))}
    </Tabs>
  );
};

export default TaskStatusTabs;
