import React, { useState, Fragment } from "react";
import {
  FaDownload,
  FaFilter,
  FaSearchPlus,
  FaSearchMinus,
  FaTimes,
} from "react-icons/fa";
import { SiMoleculer } from "react-icons/si";

const RemoteControl = ({ onZoomIn, onZoomOut, onDepthChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDepth, setSelectedDepth] = useState(1);

  const handleDepthChange = (depth) => {
    setSelectedDepth(depth);
    onDepthChange(depth);
  };

  return (
    <div className="font-notosans fixed right-6 top-1/2 transform -translate-y-1/2 z-20 flex items-start">
      {isFilterOpen && (
        <div className="mr-4 bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Visual density</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close filter"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((depth) => (
              <Fragment key={depth}>
                <div className="flex flex-col items-center z-10">
                  <button
                    onClick={() => handleDepthChange(depth)}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      selectedDepth >= depth
                        ? "bg-[#F74E3F] text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    aria-label={`Select depth ${depth}`}
                  >
                    <span className="sr-only">Depth {depth}</span>
                  </button>
                  <span className="mt-1 text-xs">
                    {depth === 1 ? "1st" : depth === 2 ? "2nd" : "3rd"}
                  </span>
                </div>
                {depth < 3 && <div className="flex-1" aria-hidden="true" />}
              </Fragment>
            ))}
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-[#F74E3F] transition-all duration-300 ease-in-out"
                style={{ width: `${(selectedDepth - 1) * (100 / 2)}%` }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-2">
        <div className="relative group">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 mb-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Toggle filter"
          >
            <SiMoleculer />
          </button>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1">
            Filter
          </span>
        </div>
        <div className="relative group">
          <button
            onClick={onZoomIn}
            className="p-2 mb-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom in"
          >
            <FaSearchPlus />
          </button>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1">
            Zoom In
          </span>
        </div>
        <div className="relative group">
          <button
            onClick={onZoomOut}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Zoom out"
          >
            <FaSearchMinus />
          </button>
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1">
            Zoom Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default RemoteControl;
