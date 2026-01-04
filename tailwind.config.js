// tailwind.config.js (extend colors)
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#caa43a",
      },
      animation: {
      marquee: "marquee 40s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
    },
  },
  plugins: [],
};
