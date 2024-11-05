import React, { useEffect, useState } from "react";

import { Input, Kbd, Tooltip } from "@nextui-org/react";

interface Props {
  autoFocus?: boolean;
  initialValue?: string | null;
  placeholder?: string;
  onChange?: (value?: string) => void;
  onSubmit?: (value: string) => Promise<void>;
}

const NameInput = ({
  autoFocus,
  initialValue,
  placeholder = "请输入",
  onChange,
  onSubmit,
}: Props) => {
  const [innerValue, setInnerValue] = useState<string>();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (initialValue) {
      setInnerValue(initialValue);
    }
  }, [initialValue]);

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isInvalid) {
      await onSubmit?.(innerValue!);
      setInnerValue("");
    }
  };

  return (
    <Input
      autoFocus={autoFocus}
      value={innerValue}
      onChange={(e) => {
        const { value } = e.target;

        setInnerValue(value);
        onChange?.(value);
        setIsInvalid(!value?.trim());
      }}
      onBlur={() => setIsInvalid(false)}
      placeholder={placeholder}
      endContent={<Tooltip content="回车键提交"><Kbd keys={["enter"]} /></Tooltip>}
      onKeyDown={handlePressEnter}
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "default"}
      errorMessage="请输入有效的名称"
    />
  );
};

export default NameInput;
