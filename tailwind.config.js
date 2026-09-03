/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        nearblack: "#07080A",
        /* Theme-aware semantic surface tokens */
        surface: {
          DEFAULT: "var(--page-bg)",
          page: "var(--page-bg)",
          section: "var(--section-bg)",
          card: "var(--card-bg)",
          hover: "var(--card-bg-hover)",
          border: "var(--border)",
        },
        brandText: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        grey: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A7ADB8",
          500: "#6F7682",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#111318",
          950: "#07080A",
        },
        zinc: {
          300: "#D4D4D8",
          400: "#A7ADB8",
          500: "#6F7682",
          600: "#52525B",
        },
        gi: {
          purple: "#7C3AED",
          orange: "#FF6A00",
          green: "#00D084",
          violet: "#7C3AED",
          magenta: "#7C3AED",
          red: "#FF6A00",
        },
      },
      backgroundImage: {
        "gi-gradient": "linear-gradient(135deg, #7C3AED 0%, #FF6A00 100%)",
        "gi-gradient-h": "linear-gradient(90deg, #7C3AED 0%, #FF6A00 100%)",
        "gi-gradient-subtle": "linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(255, 106, 0, 0.12) 100%)",
        "gi-gradient-border": "linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(255, 106, 0, 0.5) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        mono: ["var(--font-poppins)", "Poppins", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        wide: "0.04em",
        widest: "0.1em",
        ultra: "0.2em",
      },
    },
  },
  plugins: [],
};
