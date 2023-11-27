import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    light: {
      foreground: "#000000",
      background: "#eeeeee",
    },
  });

  const changeTheme = () => {
    const { light } = theme;
    if (light) {
      const newTheme = {
        dark: {
          foreground: "#ffffff",
          background: "#222222",
        },
      };
      setTheme(newTheme);
    } else {
      const newTheme = {
        light: {
          foreground: "#000000",
          background: "#eeeeee",
        },
      };
      setTheme(newTheme);
    }
  };

  const contextDataTheme = {
    theme,
    changeTheme
  }

  // Return provider
  return (
    <ThemeContext.Provider value={contextDataTheme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
