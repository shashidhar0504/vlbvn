/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vlbvn: {
          dark: '#1C120C',
          darker: '#130C08',
          brown: '#2C1D14',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#B8860B',
          orange: '#E66B27',
          'orange-light': '#F97316',
          beige: '#F4EFE6',
          cream: '#FDFBF7',
          charcoal: '#1F2421',
          slate: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 8px -2px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 4px 16px -4px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 8px 30px -6px rgba(212, 175, 55, 0.3)',
        'card': '0 2px 10px rgba(28, 18, 12, 0.04), 0 1px 3px rgba(28, 18, 12, 0.02)',
        'card-hover': '0 10px 30px -5px rgba(28, 18, 12, 0.08), 0 4px 12px -2px rgba(212, 175, 55, 0.15)',
      }
    },
  },
  plugins: [],
}
