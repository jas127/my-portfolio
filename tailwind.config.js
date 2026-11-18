/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warmcream: { DEFAULT: '#FFF7E8', 50: '#FFF7E8' },
        electricviolet: '#7049C6',
        acidlime: '#D8EF40',
        bubblegum: '#F4A8D0',
        nearblack: '#191919',
        cream: {
          50: '#FDF9F0',
          100: '#FAF3E3',
          200: '#F3E8CE',
          300: '#E8D9B5',
        },
        grass: {
          300: '#A8C98A',
          400: '#7FB35C',
          500: '#4C9A2A',
          600: '#3A7A1F',
          700: '#2C5C18',
        },
        cobalt: {
          300: '#8FB8E8',
          400: '#4A86D6',
          500: '#7049C6',
          600: '#5935A5',
          700: '#422681',
        },
        tomato: {
          400: '#E8604C',
          500: '#FF4C35',
          600: '#C83221',
        },
        butter: {
          300: '#FFE58A',
          400: '#FFD23F',
          500: '#F5B916',
          600: '#D99A0B',
        },
        lavender: {
          300: '#D4CBF0',
          400: '#B0A4E0',
          500: '#7049C6',
        },
        ink: {
          400: '#6B6255',
          500: '#4A4238',
          600: '#332E27',
          700: '#26221C',
          900: '#1A1712',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        pixel: ['"Silkscreen"', 'monospace'],
        hand: ['"Caveat"', 'cursive'],
      },
      backgroundImage: {
        paper:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        dotgrid:
          'radial-gradient(rgba(74,66,56,0.10) 1px, transparent 1px)',
        grassgrid:
          'linear-gradient(rgba(76,154,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,154,42,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
