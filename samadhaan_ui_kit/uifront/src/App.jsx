import React, { useEffect, useState } from "react";
import FileList from "./components/FileList";
import IndexList from "./components/IndexList";
import ContentDisplay from "./components/ContentDisplay";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [parsedContent, setParsedContent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showFileList, setShowFileList] = useState(true);

  // Fetch available files
  useEffect(() => {
    fetch("http://localhost:3030/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchFileContent = (filename) => {
    fetch(`http://localhost:3030/files/${filename}`)
      .then((res) => res.text())
      .then((data) => {
        setContent(data);
        setSelectedFile(filename);
        parseContent(data);
      })
      .catch((err) => console.error("Error fetching file content:", err));
  };

  const parseContent = (text) => {
    const lines = text.split("\n");
    const parsed = [];
    let currentSection = null;

    lines.forEach((line) => {
      const cleanLine = line.replace(/`/g, "").trim();

      if (cleanLine.startsWith("**") && cleanLine.endsWith("**")) {
        // Remove the bold markers
        if (currentSection) parsed.push(currentSection);
        currentSection = { heading: cleanLine.slice(2, -2), bullets: [] };
      } else if (cleanLine.startsWith("* ")) {
        // Clean the bullet points by removing the bold markers
        if (currentSection)
          currentSection.bullets.push(cleanLine.slice(2).replace(/\*\*/g, ""));
      } else if (cleanLine) {
        // Add the content without bold markers
        if (currentSection)
          currentSection.bullets.push(cleanLine.replace(/\*\*/g, ""));
      }
    });

    if (currentSection) parsed.push(currentSection);
    setParsedContent(parsed);
  };

  const handleChangeFile = () => {
    setSelectedFile(null);
    setParsedContent([]);
    setContent("");
    setShowFileList(true);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } p-4`}
    >
      <div
        className={`rounded-xl top-0 z-10 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        } p-4`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Welcome Devops Team</h1>
          <h1 className="text-xl underline font-bold">
            Samadhaan Report Viewer
          </h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Button to change file */}
        {selectedFile && (
          <>
            <p className="font-semibold">Currently Viewing: {selectedFile}</p>
            <button
              onClick={handleChangeFile}
              className="mb-2 px-2 py-2 bg-orange-500 text-white rounded w-full text-sm mt-1 md:w-auto"
            >
              Change File
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap">
        {/* File List Button (Visible if no file is selected) */}
        {!selectedFile && showFileList && (
          <button
            onClick={() => setShowFileList(!showFileList)}
            className="mb-4 md:hidden px-4 py-2 bg-blue-500 text-white rounded"
          >
            {showFileList ? "Hide Files" : "Show Files"}
          </button>
        )}

        {/* File List */}
        {showFileList && !selectedFile && (
          <div className="flex flex-col w-full md:w-1/4 mr-4">
            <FileList
              files={files}
              selectedFile={selectedFile}
              fetchFileContent={fetchFileContent}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-grow ml-4 flex flex-wrap">
          {selectedFile ? (
            <div className="flex w-full md:w-auto">
              {/* Index List on the left */}
              <div className="flex flex-col w-[70%] mr-4  max-h-screen">
                <IndexList parsedContent={parsedContent} darkMode={darkMode} />
              </div>

              {/* Content on the right */}
              <div className="flex-grow ml-4 text-sm overflow-y-auto">
                <ContentDisplay
                  parsedContent={parsedContent}
                  darkMode={darkMode}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Select a file to view its content.
            </p>
          )}
        </div>
      </div>
      <h2 className="mt-5 sticky top-0 z-10 text-lg" darkMode={darkMode}>
        🧑🏻‍💻 Developed by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/the-one-rvs/">
          Vaibhav↗️
        </a>{" "}
        &{" "}
        <a target="_blank" href="https://www.linkedin.com/in/utkarsh-gual">
          Utkarsh🔗
        </a>
      </h2>
    </div>
  );
};

export default App;
