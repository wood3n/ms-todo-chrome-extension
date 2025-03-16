import { useContext } from "react";

import { ThemeContext } from "@/context/theme";

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const isLight = theme === "light";

  return {
    theme,
    toggleTheme,
    isDark,
    isLight,
  };
};
