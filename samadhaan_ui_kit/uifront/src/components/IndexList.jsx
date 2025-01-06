import React, { useEffect, useState } from "react";

const IndexList = ({ parsedContent, darkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      parsedContent.forEach((section, index) => {
        const element = document.getElementById(`content-section-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parsedContent]);

  const scrollToSection = (index) => {
    const element = document.getElementById(`content-section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`w-full  p-4 shadow rounded-md sticky top-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } overflow-y-auto max-h-[400px]`}
    >
      <h2 className="font-semibold text-lg mb-2">Index</h2>
      <ul className="space-y-2">
        {parsedContent.map((section, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              activeIndex === index
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200 text-blue-900"
                : ""
            }`}
            onClick={() => scrollToSection(index)}
          >
            {section.heading}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexList;
