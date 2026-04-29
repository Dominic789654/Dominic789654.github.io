/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F3EC',
          2: '#EFEBE1',
        },
        ink: {
          DEFAULT: '#15141A',
          2: '#2A2830',
          3: '#5E5B66',
          4: '#8F8B96',
        },
        rule: {
          DEFAULT: '#D9D3C3',
          2: '#E6E1D2',
        },
        accent: {
          DEFAULT: '#7A1A1A',
          hover: '#5C1212',
          soft: 'rgba(122, 26, 26, 0.08)',
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
