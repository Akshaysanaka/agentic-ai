/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#10b981', // emerald-500
          secondary: '#14b8a6', // teal-500
          accent: '#f59e0b', // amber-500
          dark: '#0f172a', // slate-900
        }
      }
    },
  },
  plugins: [],
}
