import { Input, Kbd, Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  placeholder,
  onChange,
  onSubmit,
}: Props) => {
  const [innerValue, setInnerValue] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValue) {
      setInnerValue(initialValue);
    }
  }, [initialValue]);

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && innerValue) {
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
      }}
      placeholder={placeholder || t("Please enter")}
      endContent={<Tooltip content={t("Enter key to submit")}><Kbd keys={["enter"]} /></Tooltip>}
      onKeyDown={handlePressEnter}
    />
  );
};

export default NameInput;
