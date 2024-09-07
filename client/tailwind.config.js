/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    keyframes: {
      'spin-custom': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    extend: {
      animation: {
        'spin-custom': 'spin-custom 4s linear infinite',
      },
      backgroundColor: {
        'deep-purple-accent-700': '#512DA8',
        'primary-500': '#1452d7',
        'main-color': '#1f7abd',
      },
      textColor: {
        'primary-500': '#1452d7',
      },
      height: {
        '150': '620px',
        '100': '460px',
        '120': '450px',
        '125': '520px',
        '400': '400px',
        '320': '320px',

      },
    },
  },
  plugins: [],
}