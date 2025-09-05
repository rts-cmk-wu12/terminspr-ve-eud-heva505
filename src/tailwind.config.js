module.exports = {
  content: [
    "./src/app*.{js,jsx,ts,tsx,mdx}",
    "./src/components*.{js,jsx,ts,tsx,mdx}",
    "./src/pages*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#EAEAEA",
        purpleDark: "#5E2E53",
        purpleLight: "#E1A1E9",
        ink: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"],
      },
      fontSize: {
        18: "18px",
        24: "24px",
        36: "36px",
      },
      boxShadow: { drawer: "0 -2px 10px rgba(0,0,0,0.08)" },
    },
  },
  plugins: [],
};
