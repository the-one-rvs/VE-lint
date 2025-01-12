import React from "react";

const ContentDisplay = ({ parsedContent, darkMode }) => {
  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Content copied to clipboard!"))
      .catch((err) => alert("Failed to copy content: " + err));
  };

  return (
    <div>
      {parsedContent.map((section, index) => {
        const isDockerFile = section.heading === "Modified Dockerfile:";

        return (
          <div
            key={index}
            id={`content-section-${index}`} // Add ID for scroll targeting
            className="mb-6"
          >
            {/* Main Section Heading */}
            <h2 className="font-bold text-lg mb-2">{section.heading}</h2>

            {/* Dockerfile Content */}
            {isDockerFile ? (
              <div
                className={`relative border-4 rounded-xl p-4 ${
                  darkMode
                    ? "bg-gray-800 border-green-600"
                    : "bg-gray-100 border-green-400"
                }`}
              >
                {section.bullets
                  ?.map((bullet) => bullet.replace(/=+/g, "").trim())
                  .filter((line) => line) // Remove empty lines
                  .map((line, bulletIndex) => (
                    <p key={bulletIndex} className="mb-2">
                      {line}
                    </p>
                  ))}

                {/* Copy Button */}
                <button
                  onClick={() =>
                    handleCopy(
                      section.bullets
                        ?.map((bullet) => bullet.replace(/=+/g, "").trim())
                        .filter((line) => line)
                        .join("\n")
                    )
                  }
                  className={`absolute top-2 right-2 px-3 py-2 text-sm font-bold rounded ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Copy 📝
                </button>
              </div>
            ) : (
              <>
                {/* Regular Content */}
                <ul className="list-disc pl-5">
                  {section.bullets
                    ?.map((bullet) => bullet.replace(/=+/g, "").trim())
                    .filter((line) => line) // Remove empty lines
                    .map((line, bulletIndex) => (
                      <li key={bulletIndex}>{line}</li>
                    ))}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContentDisplay;
