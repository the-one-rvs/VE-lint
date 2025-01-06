import React from "react";

const ContentDisplay = ({ parsedContent, darkMode }) => {
  return (
    <div
      className={`p-4 shadow rounded-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {parsedContent.map((section, index) => (
        <div key={index} id={`content-section-${index}`} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{section.heading}</h2>
          <ul className="list-disc ml-6">
            {section.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContentDisplay;
