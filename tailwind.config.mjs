import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      serif: ['source-serif-pro', ...defaultTheme.fontFamily.serif],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      green: {
        50: '#21291F',
        200: '#6A845E',
        500: '#BBCEA8',
        700: '#D4DEC7',
      },
      'dark-green': '#6A845E',
      'light-green': '#BBCEA8',
      background: '#F9F8F6',
      gray: colors.gray,
      orange: '#E97D2B',
      yellow: {
        500: '#F0EC57',
        700: '#F4F197',
        900: '#F9F6E4',
      },
      pink: '#EA6C92',
      blue: colors.blue,
    },
    extend: {
      gridTemplateColumns: {
        subgrid: 'subgrid',
      },
      gridTemplateRows: {
        subgrid: 'subgrid',
      },
    },
  },
  plugins: [typography],
};
