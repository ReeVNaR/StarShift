/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-gradient': 'text-gradient 4s linear infinite',
        'pulse-shadow': 'pulse-shadow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'text-gradient': {
          to: {
            'background-position': '200% center',
          },
        },
        'pulse-shadow': {
          '0%, 100%': {
            'box-shadow': '0 0 8px rgba(59, 130, 246, 0)',
          },
          '50%': {
            'box-shadow': '0 0 16px rgba(59, 130, 246, 0.5)',
          },
        }
      }
    },
  },
  plugins: [],
}
