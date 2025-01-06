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
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchFileContent = (filename) => {
    fetch(`http://localhost:5000/files/${filename}`)
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
        if (currentSection) parsed.push(currentSection);
        currentSection = { heading: cleanLine.slice(2, -2), bullets: [] };
      } else if (cleanLine.startsWith("* ")) {
        if (currentSection) currentSection.bullets.push(cleanLine.slice(2));
      } else if (cleanLine) {
        if (currentSection) currentSection.bullets.push(cleanLine);
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome Engineer</h1>

        <h1 className="text-xl font-bold">Samadhaan Viewer</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Button to change file */}
      {selectedFile && (
        <button
          onClick={handleChangeFile}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded w-full md:w-auto"
        >
          Change File
        </button>
      )}

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
              <div className="flex flex-col w-full  mr-4 ">
                <IndexList parsedContent={parsedContent} darkMode={darkMode} />
              </div>

              {/* Content on the right */}
              <div className="flex-grow ml-4 text-sm">
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
      <h2 className="mt-5 text-lg" darkMode={darkMode}>
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
