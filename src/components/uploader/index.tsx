import React, { useRef } from "react";

import { Upload } from "@icon-park/react";
import { Button } from "@nextui-org/react";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Uploader = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Button
      isIconOnly
      size="sm"
      variant="flat"
      color="primary"
      radius="full"
      className="h-5 min-h-5"
      onPress={() => inputRef.current?.click()}
    >
      <Upload />
      <input ref={inputRef} type="file" multiple={false} className="hidden" onChange={onChange} />
    </Button>
  );
};

export default Uploader;
