// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',        // main headers, navigation
        secondary: '#065f46',       // accent elements, buttons
        highlight: '#047857',       // hover states, highlights
        text: '#374151',            // body text
        light: '#f0fdf4',           // sections, cards
        background: '#ffffff',       // background
      },
      fontFamily: {
        primary: ['Proxima Nova Condensed', 'Proxima Nova', 'Arial Narrow', 'Arial', 'sans-serif'],
        headers: ['Proxima Nova Condensed', 'Proxima Nova', 'Arial Narrow', 'Arial', 'sans-serif'],
        arabic: ['MediaPro Heavy Condens', 'MediaPro', 'Arial', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
}