/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF9F5',
          2: '#F0EEE6',
        },
        ink: {
          DEFAULT: '#3D3929',
          2: '#5A5447',
          3: '#8C8676',
          4: '#B5AF9F',
        },
        rule: {
          DEFAULT: '#E8E4D8',
          2: '#F0EDE2',
        },
        accent: {
          DEFAULT: '#CC785C',
          hover: '#B8694F',
          soft: 'rgba(204, 120, 92, 0.08)',
        },
      },
      fontFamily: {
        serif: ["'Newsreader'", "'Iowan Old Style'", 'Georgia', 'serif'],
        sans: ["'Inter Tight'", '-apple-system', 'BlinkMacSystemFont', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
