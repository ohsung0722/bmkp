/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        notosans: ["Noto Sans"],
        pretendardRegular: ["pretendard-regular"],
        pretendardBold: ["pretendard-bold"],
        pretendardExtraBold: ["pretendard-extrabold"],
        pretendardBlack: ["pretendard-black"],
        pretendardSemiBold: ["pretendard-semibold"],
        georgia: ["georgia"],
      },
      colors: {
        "background-gray": "#f9f9f9",
        "node-orange:": "#F74E3F",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateX(-100%)" }, // 화면 밖에서 시작
          "100%": { opacity: "1", transform: "translateX(0)" }, // 화면 안으로 들어옴
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateX(0)" }, // 화면 안에 있음
          "100%": { opacity: "0", transform: "translateX(-100%)" }, // 화면 밖으로 나감
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
