/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#17171B",
          secondary: "#1a1a1a",
          tertiary: "rgba(50, 50, 50, 0.51)",
        },
        accent: {
          primary: "#ff9900",
          secondary: "#F36F45",
        },
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
      }),
      fontFamily: {
        quicksand: ["Quicksand", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
