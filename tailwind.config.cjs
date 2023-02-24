/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Spline Sans", "sans-serif"],
      },
      colors: {
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-checked": "var(--color-text-checked)",
        "text-today": "var(--color-text-today)",
        bg: "var(--color-bg)",
        "bg-overlay": "var(--color-bg-overlay)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-checked": "var(--color-bg-checked)",
        "bg-unchecked": "var(--color-bg-unchecked)",
        border: "var(--color-border)",
        "border-focus": "var(--color-border-focus)",
      },
    },
  },
  plugins: [],
};
