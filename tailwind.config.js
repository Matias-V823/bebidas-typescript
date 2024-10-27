/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        "header": "url('./assets/bg-header.jpg')",
        "index": "url('./assets/bgIndex.jpg')"
      },
      textColor:{
        "principal": "#FAF4DA"
      }
    },
  },
  plugins: [],
};
