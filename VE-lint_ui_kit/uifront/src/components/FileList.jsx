import React from "react";

const FileList = ({ files, selectedFile, fetchFileContent, darkMode }) => {
  return (
    <div
      className={`w-full md:w-[90%] p-4 shadow rounded-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="font-semibold text-xl mb-2">Scan Report Files</h2>
      <ul className="space-y-2 overflow-y-auto">
        {files.map((file, index) => (
          <li
            key={index}
            className={`p-2 rounded cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap text-sm md:text-base ${
              selectedFile === file
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200 text-blue-900"
                : darkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
            onClick={() => fetchFileContent(file)}
            style={{ maxWidth: "100%", overflow: "hidden" }}
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
