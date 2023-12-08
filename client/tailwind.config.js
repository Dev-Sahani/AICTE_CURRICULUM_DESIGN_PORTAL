/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...colors,
        primary : {
          50: '#EFF9FF',
          100: '#DEF2FF',
          200: '#B6E8FF',
          300: "#75D8FF",
          400: '#2CC4FF',
          500: '#00A6ED',
          600: '#008AD4',
          700: '#006EAB',
          800: '#005D8D',
          900: '#064D74',
          950: "#04314D",
        },
        secondary: {
          50: '#FBFFE5',
          100: '#F3FFC7',
          200: '#E6FF95',
          300: "#D2FE58",
          400: '#BCF526',
          500: '#9DDC06',
          600: '#7FB800',
          700: '#5B8506',
          800: '#4A690B',
          900: '#3E580F',
          950: "#1F3201",
        },
        accent: {
          50: '#FFFEEA',
          100: '#FFF9C5',
          200: '#FFF285',
          300: "#FFE546",
          400: '#FFD51B',
          500: '#FFB400',
          600: '#E28A00',
          700: '#BB6002',
          800: '#984A08',
          900: '#7C3D0B',
          950: "#481F00",
        },
        default: "#F8FBFC",
      }
    },
  },
    plugins: [],
}