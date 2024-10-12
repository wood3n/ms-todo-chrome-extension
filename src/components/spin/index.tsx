import type React from "react";

import { Spinner } from "@nextui-org/react";
import clx from "classnames";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const Spin: React.FC<Props> = ({ loading, children, className }) => {
  if (loading) {
    return (
      <div className={clx("h-full flex items-center justify-center", className)}>
        <Spinner label="Loading..." color="primary" />
      </div>
    );
  }

  return children;
};

export default Spin;
