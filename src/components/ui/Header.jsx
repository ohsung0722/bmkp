import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Popup from "./Popup";

const navItems = [
  { name: "About", title: "About" },
  { name: "Project Team", title: "Project Team" },
  { name: "Guide", title: "Guide" },
  {
    name: "Credits & Acknowledgements",
    title: "Credits & Acknowledgements",
  },
  { name: "Browse All Periodicals", title: "Browse All Periodicals" },
];

const Header = ({ onSelectTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNavClick = (title) => {
    setPopupTitle(title);
    setIsPopupOpen(true);
    setIsOpen(false);
  };

  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span
              onClick={() =>
                handleNavClick(
                  "Project DH Bibliography of Modern Korean Periodicals (BMKP)"
                )
              }
              className="font-montserrat text-2xl font-bold text-gray-900 hover:cursor-pointer"
            >
              BMKP
            </span>
            <span className="font-georgia ml-2 text-sm text-gray-500">
              Bibliography of Modern Korean Periodicals
            </span>
          </div>

          <div className="hidden md:flex md:ml-6 md:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleNavClick(item.title)}
                className="font-pretendard font-medium text-base text-gray-900 hover:text-gray-700 relative group tracking[-1%] leading-[24px] cursor-pointer inline-flex items-center px-1 pt-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </div>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-60 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleNavClick(item.title)}
              className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          title={popupTitle}
          onClose={closePopup}
          onSelectTitle={onSelectTitle}
        />
      )}
    </header>
  );
};

export default Header;
