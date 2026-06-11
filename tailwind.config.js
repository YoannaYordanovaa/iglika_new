/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif"', "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "3.25rem",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "display-lg": [
          "2.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "display-md": [
          "1.875rem",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" },
        ],
        "display-sm": [
          "1.375rem",
          { lineHeight: "1.35", letterSpacing: "0", fontWeight: "600" },
        ],
        "body-lg": ["1.0625rem", { lineHeight: "1.8", fontWeight: "400" }],
        "body-md": ["0.9375rem", { lineHeight: "1.75", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.65", fontWeight: "400" }],
        label: [
          "0.6875rem",
          { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" },
        ],
        eyebrow: [
          "0.6875rem",
          { lineHeight: "1", letterSpacing: "0.14em", fontWeight: "600" },
        ],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      colors: {
        green: {
          50: "#93bd72",
          100: "#C9E2A8",
          200: "#A3CC6A",
          400: "#639922",
          600: "#4A7C1F",
          800: "#2E5210",
          900: "#1B3309",
        },
        gold: {
          50: "#ffdf72",
          100: "#F5E8B8",
          200: "#EDD07A",
          400: "#D4A017",
          600: "#A87B0F",
          800: "#7A5600",
          900: "#4A3300",
        },
        orange: {
          50: "#FDF1E7",
          100: "#F9D5AD",
          400: "#DC8C3A",
          600: "#C86A10",
          800: "#8A4408",
        },
        neutral: {
          50: "#FAFAF7",
          100: "#F3F2EE",
          200: "#E5E4DF",
          300: "#CFCDC6",
          400: "#9A9890",
          500: "#6B6960",
          600: "#4B4A43",
          700: "#333229",
          800: "#1E1D16",
          900: "#111109",
        },
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        pill: "9999px",
        card: "1rem",
        btn: "1.5rem",
      },

      keyframes: {
        scrollDot: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
      animation: {
        scrollDot: "scrollDot 1.8s ease-in-out infinite",
      },

      keyframes: {
        bounceIn: {
          "0%": {
            transform: "translateX(-50%) scale(0) translateY(4px)",
            opacity: "0",
          },
          "60%": {
            transform: "translateX(-50%) scale(1.3) translateY(-2px)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-50%) scale(1) translateY(0)",
            opacity: "1",
          },
        },
        // ... scrollDot което вече имаш
      },
      animation: {
        bounceIn: "bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        // ... scrollDot което вече имаш
      },
    },
  },
  plugins: [],
};
