/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ** This is used to create custom theme
      letterSpacing: {
        wide: '.01em',
        wider: '.05em',
        widest: '.5em',
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        mm: '2rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '7rem',
        '9xl': '9rem',
        '10xl': '12rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        sm: '500px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        xxl: '1600px',
        fhd: '1920px',
      },
      colors: {
        brand: {
          main: {
            400: '#3579F6',
          },
          secondary: {
            400: '#4D39E5',
          },
          dark: '#36404F',
          bg: '#F6F9FC',
          accent: '#F3AF3D',
          error: '#EB4A4E',
          good: '#54B983',
        },
      },
    },
  },
  plugins: [],
};
