/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        colors: {
          customOne: "#4C8CF5",
          customTwo: "#0228B9",
          customThree: "#F72D93",
          customfour: "#DF87B8",
          customfive: "#96266C",
          customsix: "#462B73",
          customseven: "#6E6865",
          customeight: "#463B3F",
          myWhite: "#ffffff",
          black: "#000000",
     
        },
      },
      fontFamily: {
        iransans: ["IRANSans", "sans-serif"],
      },
      boxShadow: {
        custom: "3px 14px 26px -9px rgba(0,0,0,0.75)",
      },
    },
  },
  plugins: [],
};
