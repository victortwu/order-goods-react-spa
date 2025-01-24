import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { applyTheme } from "@cloudscape-design/components/theming";
import { getTheme } from "../../Theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsDark((prevIsDark: boolean) => {
      const newIsDark = !prevIsDark;
      localStorage.setItem("isDark", JSON.stringify(newIsDark));
      return newIsDark;
    });
  };

  useEffect(() => {
    applyTheme({ theme: getTheme(isDark) });
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
