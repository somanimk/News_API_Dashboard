/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Enable JIT mode
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Remove unused styles
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom blue color
        secondary: '#F43F5E', // Custom pink color
      },
      spacing: {
        '128': '32rem', // Custom spacing
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
