/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 이부분추가
  darkMode: "class",
  theme: {
    extend: {
      // 색상 설정
      colors: {
        primary7: "#F92525",
        primary6: "#FF4747",
        primary5: "#FF6B6B",
        primary4: "#FF8888",
        primary3: "#FF9393",
        primary2: "#FFBCBC",
        primary1: "#FFE2E2",
        secondary1: "#00A400",
        secondary2: "#66B966",
        grayscale7: "#202027",
        grayscale6: "#4D4D4D",
        grayscale5: "#808080",
        grayscale4: "#C6C6C6",
        grayscale3: "#E9E9E9",
        grayscale2: "#F3F3F3",
        grayscale1: "#FFFFFF",
      },
      // 폰트 설정
      fontFamily: {
        thin: ["thin"],
        light: ["light"],
        regular: ["regular"],
        bold: ["bold"],
        extrabold: ["extrabold"],
      },
    },
  },
  plugins: [],
};
