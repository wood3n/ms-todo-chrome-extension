import { Spinner } from "@nextui-org/react";
import classNames from "classnames";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const SpinContainer = ({ loading, children }: Props) => {
  return (
    <div className="relative block h-full w-full">
      {children}
      <div
        role="status"
        className={classNames("absolute left-1/2 top-2/4 h-full w-full -translate-x-1/2 -translate-y-1/2 select-none bg-white opacity-60 flex justify-center items-center", {
          hidden: !loading,
        })}
      >
        <Spinner />
      </div>
    </div>

  );
};

export default SpinContainer;
