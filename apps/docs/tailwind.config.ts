import { join } from 'path';
import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    join(__dirname, 'src/**/*.{astro,mdx,tsx}'),
    join(__dirname, '../../libs/ui/**/*.{astro,mdx,tsx}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        xxl: 'var(--font-size-xxl)',
        xxxl: 'var(--font-size-xxxl)',
      },
      colors: {
        'surface-1': 'hsl(var(--surface-1))',
        'surface-2': 'hsl(var(--surface-2))',
        'surface-3': 'hsl(var(--surface-3))',
        'foreground-1': 'hsl(var(--foreground-1))',
        'foreground-2': 'hsl(var(--foreground-2))',
      },
      borderRadius: { DEFAULT: 'var(--radius)' },
      borderColor: { DEFAULT: 'hsl(var(--border))' },
      ringColor: { DEFAULT: 'hsl(var(--ring))' },
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--font-size-xs': 'clamp(0.64rem, -0.09vw + 0.82rem, 0.64rem)',
          '--font-size-sm': 'clamp(0.8rem, -0.09vw + 0.82rem, 0.75rem)',
          '--font-size-base': 'clamp(1rem, 0vw + 1rem, 1rem)',
          '--font-size-md': 'clamp(1.25rem, 0.15vw + 1.21rem, 1.33rem)',
          '--font-size-lg': 'clamp(1.56rem, 0.39vw + 1.47rem, 1.78rem)',
          '--font-size-xl': 'clamp(1.95rem, 0.76vw + 1.76rem, 2.37rem)',
          '--font-size-xxl': 'clamp(2.44rem, 1.3vw + 2.12rem, 3.16rem)',
          '--font-size-xxxl': 'clamp(3.05rem, 2.1vw + 2.53rem, 4.21rem)',
          '--surface-1': '0 0% 4%',
          '--surface-2': '0 0% 9%',
          '--surface-3': '0 0% 14%',
          '--foreground-1': '0 0% 90%',
          '--foreground-2': '0 0% 55%',
          '--border': '0 0% 30%',
          '--ring': '0 0% 80%',
          '--radius': '0.25rem',
          '--scrollbar-thumb': 'hsl(var(--surface-3))',
          '--scrollbar-thumb-radius': 'var(--radius)',
          '--scrollbar-track-radius': 'var(--radius)',
          '--scrollbar-track': 'transparent',
        },
      });
    }),
  ],
} satisfies Config;
