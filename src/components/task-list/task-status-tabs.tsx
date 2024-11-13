import React from "react";

import { Tab, Tabs } from "@nextui-org/react";

export type Status = "inProgress" | "completed";

interface TabConfig {
  key: Status;
  label: React.ReactNode;
}

interface Props {
  tabs: TabConfig[];
  selectedKey: Status;
  onChange: (status: Status) => void;
}

const TaskStatusTabs = ({
  tabs,
  selectedKey,
  onChange,
}: Props) => {
  return (
    <Tabs
      size="sm"
      color="primary"
      selectedKey={selectedKey}
      onSelectionChange={key => onChange(key as Status)}
    >
      {tabs.map(item => (
        <Tab key={item.key} title={item.label} />
      ))}
    </Tabs>
  );
};

export default TaskStatusTabs;
