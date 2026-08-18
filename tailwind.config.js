/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        nearblack: "#050505",
        surface: {
          DEFAULT: "#0a0a0a",
          card: "#111111",
          raised: "#171717",
          subtle: "#1f1f1f",
          border: "#27272a",
        },
        grey: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        gi: {
          purple: "#7928CA",
          violet: "#8B5CF6",
          magenta: "#E0287D",
          red: "#E11D48",
          orange: "#FF6B00",
        }
      },
      backgroundImage: {
        "gi-gradient": "linear-gradient(135deg, #7928CA 0%, #E0287D 35%, #E11D48 70%, #FF6B00 100%)",
        "gi-gradient-h": "linear-gradient(90deg, #7928CA 0%, #E0287D 35%, #E11D48 70%, #FF6B00 100%)",
        "gi-gradient-subtle": "linear-gradient(135deg, rgba(121, 40, 202, 0.12) 0%, rgba(224, 40, 125, 0.1) 45%, rgba(255, 107, 0, 0.12) 100%)",
        "gi-gradient-border": "linear-gradient(135deg, rgba(121, 40, 202, 0.5) 0%, rgba(224, 40, 125, 0.5) 45%, rgba(255, 107, 0, 0.5) 100%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "system-ui", "sans-serif"],
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
