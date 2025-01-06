import React from "react";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
    >
      {darkMode ? "Light Mode🌞" : "Dark Mode🌜"}
    </button>
  );
};

export default DarkModeToggle;
