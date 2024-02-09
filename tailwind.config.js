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
      armyGreen: {
        500: '#1B775E', // Adjust value to your specific shade
        100: '#D0F0E8', // Optional lighter shade
        200: '#A3C4BE', // Optional lighter shade
        300: '#769891', // Optional lighter shade
        400: '#496C64', // Optional lighter shade
        600: '#115C4B', // Optional darker shade
        700: '#0B463C', // Optional darker shade
        800: '#073029', // Optional darker shade
        900: '#031A16', // Optional darker shade
      },
    },
  },
  plugins: [],
}

