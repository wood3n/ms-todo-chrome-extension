import React, { useEffect } from "react";

import { useTheme } from "@nextui-org/use-theme";
import classNames from "classnames";

import { storageGet, StorageKey, storageSet } from "@/utils/storage";

import { ThemeContext } from "./context";

interface Props {
  children: React.ReactNode;
}

const getPreferTheme = async () => {
  const localTheme = await storageGet(StorageKey.Theme);

  if (localTheme) {
    return localTheme;
  }

  return "light";
};

const ThemeProvider = ({ children }: Props) => {
  const { theme, setTheme } = useTheme();

  const initTheme = async () => {
    const preferTheme = await getPreferTheme();

    setTheme(preferTheme);
  };

  useEffect(() => {
    initTheme();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    storageSet({
      [StorageKey.Theme]: nextTheme,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={classNames("text-foreground bg-background size-full overflow-hidden", theme)}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
