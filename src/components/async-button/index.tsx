import { forwardRef, useState } from "react";

import { Button, type ButtonProps } from "@nextui-org/react";

const AsyncButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...props }, ref) => {
  const [loading, setLoading] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const result = onClick?.(e);

    // @ts-ignore
    if (result instanceof Promise) {
      setLoading(true);
      result.finally(() => {
        setLoading(false);
      });
    }
  };

  return <Button ref={ref} {...props} isLoading={loading} onClick={handleClick} />;
});

export default AsyncButton;
