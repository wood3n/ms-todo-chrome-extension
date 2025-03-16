import { Spinner } from "@nextui-org/react";

import classNames from "classnames";

interface Props {
  loading: boolean;
  children: React.ReactNode;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SpinContainer = ({ loading, children, label, size, className }: Props) => {
  return (
    <div className={classNames("relative h-full w-full", className)}>
      {children}
      <div
        className={classNames("absolute left-1/2 top-2/4 h-full w-full -translate-x-1/2 -translate-y-1/2 select-none opacity-60 flex justify-center items-center", {
          hidden: !loading,
        })}
      >
        <Spinner label={label} size={size} />
      </div>
    </div>
  );
};

export default SpinContainer;
