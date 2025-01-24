import React from "react";
import { useRecoilValue } from "recoil";
import { excelDataState } from "../../../hooks/excelDataState";

// 한글 초성 정렬용 배열
const KOREAN_INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const getInitialLetter = (str) => {
  if (!str || typeof str !== "string") return "Others";

  const code = str.charCodeAt(0); // 첫 글자의 유니코드

  if (code >= 0xac00 && code <= 0xd7a3) {
    const initialCode = Math.floor((code - 0xac00) / 588); // 초성 인덱스 계산
    return KOREAN_INITIALS[initialCode];
  }

  if (/[A-Za-z]/.test(str[0])) return str[0].toUpperCase(); // 영어 처리

  return "Others"; // 그 외 문자 처리
};

const Titles = ({ onTitleClick }) => {
  const data = useRecoilValue(excelDataState);

  const groupedTitles = data.reduce((acc, item) => {
    const initial = getInitialLetter(item.titleNode);
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push(item.titleNode);
    return acc;
  }, {});

  const handleClick = (title) => {
    onTitleClick(title);
  };

  return (
    <div className="font-notosans space-y-8 pr-2 text-gray-800 max-h-[80vh] overflow-y-auto text-left custom-scrollbar">
      {KOREAN_INITIALS.map(
        (initial) =>
          groupedTitles[initial] && (
            <div key={initial} className="space-y-2">
              <h3 className="text-lg font-bold">{initial}</h3>
              <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 underline underline-offset-4">
                {groupedTitles[initial].map((title, index) => (
                  <span
                    key={index}
                    onClick={() => handleClick(title)}
                    className="cursor-pointer"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          )
      )}

      {Object.keys(groupedTitles)
        .filter((key) => /^[A-Z]$/.test(key))
        .sort()
        .map((letter) => (
          <div key={letter} className="space-y-2">
            <h3 className="text-lg font-bold">{letter}</h3>
            <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 underline underline-offset-4">
              {groupedTitles[letter].map((title, index) => (
                <span
                  key={index}
                  onClick={() => handleClick(title)}
                  className="cursor-pointer"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        ))}

      {/* {groupedTitles["Others"] && (
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Others</h3>
          <div className="w-full h-[1px] bg-gray-900 mb-4"></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 underline underline-offset-4">
            {groupedTitles["Others"].map((title, index) => (
              <span
                key={index}
                onClick={() => handleClick(title)}
                className="cursor-pointer "
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Titles;
