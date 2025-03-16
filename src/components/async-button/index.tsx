import { Button, type ButtonProps } from "@nextui-org/react";
import { forwardRef, useState } from "react";

const AsyncButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onPress, ...props }, ref) => {
  const [loading, setLoading] = useState(false);

  const handleClick: ButtonProps["onPress"] = (e) => {
    const result = onPress?.(e);

    // @ts-ignore
    if (result instanceof Promise) {
      setLoading(true);
      result.finally(() => {
        setLoading(false);
      });
    }
  };

  return <Button ref={ref} {...props} isLoading={loading} onPress={handleClick} />;
});

export default AsyncButton;
