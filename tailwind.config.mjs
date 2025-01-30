import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [typography],
  theme: {
    colors: {
      background: '#F9F8F6',
      black: colors.black,
      blue: colors.blue,
      'dark-green': '#6A845E',
      gray: colors.gray,
      green: {
        50: '#21291F',
        200: '#6A845E',
        500: '#BBCEA8',
        700: '#D4DEC7',
      },
      'light-green': '#BBCEA8',
      orange: '#E97D2B',
      pink: '#EA6C92',
      white: colors.white,
      yellow: {
        500: '#F0EC57',
        700: '#F4F197',
        900: '#F9F6E4',
      },
    },
    extend: {
      gridTemplateColumns: {
        subgrid: 'subgrid',
      },
      gridTemplateRows: {
        subgrid: 'subgrid',
      },
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      serif: ['source-serif-pro', ...defaultTheme.fontFamily.serif],
    },
  },
};
