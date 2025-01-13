import React from "react";

const FileSelector = ({ files, selectFile, darkMode }) => {
  return (
    <div
      className={`p-4 shadow rounded-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="font-semibold text-lg mb-2">Available Files</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={index}
            className={`p-2 rounded cursor-pointer ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            onClick={() => selectFile(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileSelector;
