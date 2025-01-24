import React from "react";
import About from "./headerPopup/About";
import Team from "./headerPopup/Team";
import Guide from "./headerPopup/Guide";
import Credit from "./headerPopup/Credit";
import Titles from "./headerPopup/Titles";
import Logo from "./headerPopup/Logo";

const CONTENT_COMPONENTS = {
  "Project DH Bibliography of Modern Korean Periodicals (BMKP)": Logo,
  "Browse All Periodicals": Titles,
  About: About,
  "Project Team": Team,
  Guide: Guide,
  "Credits & Acknowledgements": Credit,
};

const Popup = ({ title, onClose, onSelectTitle }) => {
  const handleTitleClick = (selectedTitle) => {
    onSelectTitle(selectedTitle);
    onClose();
  };
  const ContentPopup = CONTENT_COMPONENTS[title];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-notosans text-2xl font-bold mb-2">{title}</h1>
          <button
            onClick={onClose}
            className="mb-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div>
          <ContentPopup onTitleClick={handleTitleClick} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
