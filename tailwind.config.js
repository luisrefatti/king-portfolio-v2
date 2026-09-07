/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "paper" = fundo da página (agora escuro); "ink" = texto (agora claro).
        // Os nomes ficam os mesmos do modo claro anterior para manter o
        // significado semântico das classes (bg-paper, text-ink, etc.).
        paper: {
          DEFAULT: "#17160F",
          soft: "#1E1C14",
        },
        ink: {
          DEFAULT: "#F1EDE2",
          soft: "#B6B1A0",
          faint: "#84806D",
        },
        line: "#332F1F",
        gold: {
          DEFAULT: "#C79A52",
          soft: "#E0C083",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
}
