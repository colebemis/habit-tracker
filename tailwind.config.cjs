/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        bg: "var(--color-bg)",
        "bg-checked": "var(--color-bg-checked)",
        "bg-unchecked": "var(--color-bg-unchecked)",
        divider: "var(--color-divider)",
      },
    },
  },
  plugins: [],
};
