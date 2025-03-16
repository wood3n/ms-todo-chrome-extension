import { Moon, Sun } from "@icon-park/react";
import { Switch } from "@nextui-org/react";
import React from "react";

import { useTheme } from "@/utils/theme";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      color="success"
      endContent={<Moon />}
      size="lg"
      startContent={<Sun />}
      isSelected={theme === "light"}
      onPointerDown={e => e.stopPropagation()}
      onValueChange={toggleTheme}
    >
      {theme === "dark" ? "Dark" : "Light"}
    </Switch>
  );
};

export default ThemeSwitch;
