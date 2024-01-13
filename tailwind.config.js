import defaultTheme from 'tailwindcss/defaultTheme'
import pluginForms from '@tailwindcss/forms'

/** @type { import('tailwindcss').Config } */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans SC', ...defaultTheme.fontFamily.sans],
        titillium: ['Titillium Web', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: '500px'
      }
    },
  },
  plugins: [
    pluginForms
  ],
}
