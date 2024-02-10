/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        cream: '#F5F5F5', // Adjust if needed
        'green-900': '#1f4037',  // Adjust if needed
      },
      'army-green': {
        DEFAULT: '#334756',
        light: '#7793A9',
        dark: '#1E2934',
      },
    },
  },
  plugins: [],
}

