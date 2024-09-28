import React from "react";
import { DEFAULT_PLATFORMS } from "../hooks/useContests";

const SettingsMenu = ({ theme, setThemeMode, platforms, setPlatforms }) => {
  const handleChange = (event) => {
    setThemeMode(event.target.value);
  };

  const handlePlatformChange = (event) => {
    const platform = event.target.value;
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="p-4 pt-2 w-full">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
        Settings
      </h2>
      <div className="flex flex-row justify-between w-full items-center mb-4">
        <label
          htmlFor="themeSelect"
          className="mr-2 text-lg text-gray-700 dark:text-gray-300"
        >
          Choose theme:
        </label>
        <select
          id="themeSelect"
          onChange={handleChange}
          className="border text-lg p-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          value={theme}
          aria-label="Theme Selector"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="neon">Neon</option>
          <option value="sepia">Sepia</option>
        </select>
      </div>
      <div className="flex flex-col w-full mb-4 gap-3">
        <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Select platforms:
        </label>
        <div className="flex flex-col w-full gap-2">
          {DEFAULT_PLATFORMS.map((p, index) => (
            <label
              className="flex flex-row w-full items-center justify-between text-lg text-gray-800 dark:text-gray-300"
              key={p}
            >
              <span>{`${index + 1}. ${p}`}</span>
              <input
                type="checkbox"
                value={p}
                checked={platforms.includes(p)}
                onChange={handlePlatformChange}
                className="mr-2"
                aria-label={`Select ${p}`}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
