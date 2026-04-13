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
      // Update HTML class immediately for CSS variables
      document.documentElement.className = newIsDark ? 'theme-dark' : 'theme-light';
      return newIsDark;
    });
  };

  useEffect(() => {
    // Apply Cloudscape theme
    applyTheme({ theme: getTheme(isDark) });
    // Ensure HTML class matches state
    document.documentElement.className = isDark ? 'theme-dark' : 'theme-light';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
