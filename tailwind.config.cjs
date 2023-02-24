/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        bg: "var(--color-bg)",
        "bg-checked-top": "var(--color-bg-checked-top)",
        "bg-checked-bottom": "var(--color-bg-checked-bottom)",
        "bg-unchecked": "var(--color-bg-unchecked)",
        divider: "var(--color-divider)",
      },
    },
  },
  plugins: [],
};
