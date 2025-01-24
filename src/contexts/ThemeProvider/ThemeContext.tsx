import { createContext, useContext } from "react";

type ThemeContextType = {
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDark: false,
});

export const useDarkMode = () => useContext(ThemeContext);
