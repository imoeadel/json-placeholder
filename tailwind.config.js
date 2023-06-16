/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#1b1b1b',
        light: '#f5f5f5',
        primary: '#2196F3',
        primaryDark: '#49b8e4',
      },
    },
    screens: {
      "2xl": { max: "1535px" },
  
      xl: { max: "1279px" },
  
      lg: { max: "1023px" },
  
      md: { max: "767px" },
  
      sm: { max: "639px" },
  
      xs: { max: "479px" },
  },
  },
  plugins: [],
}

