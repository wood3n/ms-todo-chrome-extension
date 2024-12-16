import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Uploader = ({ children, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => inputRef.current?.click()}>
      {children}
      <input ref={inputRef} type="file" multiple={false} className="hidden" onChange={onChange} />
    </div>
  );
};

export default Uploader;
