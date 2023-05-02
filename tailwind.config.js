/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      ssm: '360px',

      smd: '450px',

      // md: '960px',

      // lg: '1440px',
    },
    extend: {
      colors: {
        primary: '#131313',
        active: '#F7444E',
        footer: 'f8f8f8',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        Popins: ['Poppins', 'Arial'],
      },
      screens: {
        sm: '375px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
