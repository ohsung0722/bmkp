import React, { useState, useEffect, useRef } from "react";

const SearchBox = ({ data, onSearchBoxClick, onSearchResult }) => {
  const targetProperties = [
    "titleNode",
    "yearNode",
    "publisherNode",
    "placeNode",
    "categoryNode",
    "tag1",
    "tag2",
    "tag3",
    "tag4",
    "tag5",
    "tag6",
    "tag7",
    "tag8",
  ];

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      setIsCategoryOpen(false);
      return;
    }

    const startsWithResults = [];
    const containsResults = [];

    data.forEach((item) => {
      targetProperties.forEach((prop) => {
        if (item[prop] != null) {
          let rawValue =
            typeof item[prop] === "string"
              ? item[prop].toLowerCase()
              : item[prop].toString();

          // 필터링 로직
          if (rawValue.startsWith(searchQuery)) {
            startsWithResults.push({
              value:
                prop === "categoryNode"
                  ? `${item[prop]} (분류)`
                  : prop.startsWith("tag")
                  ? `#${item[prop]}`
                  : item[prop],
              item,
              prop,
            });
          } else if (rawValue.includes(searchQuery)) {
            containsResults.push({
              value:
                prop === "categoryNode"
                  ? `${item[prop]} (분류)`
                  : prop.startsWith("tag")
                  ? `#${item[prop]}`
                  : item[prop],
              item,
              prop,
            });
          }
        }
      });
    });

    // 중복 제거
    const uniqueResults = Array.from(
      new Map(
        [...startsWithResults, ...containsResults].map((res) => [
          `${res.value}-${res.prop}`,
          res,
        ])
      ).values()
    );

    setFilteredResults(uniqueResults.slice(0, 6));
    setIsCategoryOpen(true);
  };

  //검색 결과 클릭 시 상위 컴포넌트로 값 전달
  const handleResultClick = (result) => {
    onSearchResult(result);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchBoxRef}
      className="fixed top-20 left-6"
      onClick={onSearchBoxClick}
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search"
          className="w-80 pl-10 p-2 border border-gray-200 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={query}
          onChange={handleSearch}
          onClick={() => setIsCategoryOpen(true)}
        />
      </div>

      {isCategoryOpen && filteredResults.length > 0 && (
        <div
          className="mt-2 bg-white shadow-lg rounded-lg"
          style={{ maxWidth: "320px" }}
        >
          <ul>
            {filteredResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleResultClick(result.value)}
                className="p-2 hover:bg-gray-100 cursor-pointer break-words"
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  maxWidth: "320px",
                  height: "auto",
                }}
              >
                {`${result.value}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
