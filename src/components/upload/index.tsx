import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Upload = ({ children, onChange, className }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div onPointerDown={() => inputRef.current?.click()} className={className}>
      {children}
      <input
        ref={inputRef}
        type="file"
        multiple={false}
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default Upload;
