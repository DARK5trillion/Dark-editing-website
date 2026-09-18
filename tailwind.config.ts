import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#C5A02E',
          600: '#B8860B',
          700: '#9A6B0A',
        },
        dark: {
          900: '#121212',
          950: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
        },
        platinum: {
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#B0B0B0',
        },
      },
      fontFamily: {
        serif: ['var(--font-dark-serif)', 'Georgia', 'serif'],
        display: ['var(--font-geometric)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;