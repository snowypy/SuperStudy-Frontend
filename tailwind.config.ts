module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#9F7AEA',
          700: '#6B46C1',
        },
        pink: {
          500: '#ED64A6',
        },
        red: {
          500: '#F56565',
        },
        yellow: {
          300: '#FAF089',
          400: '#F6E05E',
        },
      },
    },
  },
  plugins: [],
}