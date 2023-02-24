/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        bg: "var(--color-bg)",
        divider: "var(--color-divider)",
      },
    },
  },
  plugins: [],
};
