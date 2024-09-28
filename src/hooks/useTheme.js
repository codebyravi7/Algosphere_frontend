import { useEffect, useState } from "react";
import { MODE } from "../types/theme";

const THEME_KEY = "theme";

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_KEY) || MODE.light
  );

  useEffect(() => {
    // Remove all possible theme classes
    document.documentElement.classList.remove(
      MODE.light,
      MODE.dark,
      MODE.neon,
      MODE.sepia
    );

    // Add the current theme class
    document.documentElement.classList.add(theme);

    // Store the theme in localStorage
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);


  const setThemeMode = (newTheme) => {
    console.log("set theme node in use theme-> ::",newTheme)
    setTheme(newTheme);
  };

  return { theme, setThemeMode };
};

export default useTheme;
