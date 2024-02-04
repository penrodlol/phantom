import { join } from 'path';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    join(__dirname, 'src/**/*.{astro,mdx,tsx}'),
    join(__dirname, '../../libs/ui/**/*.{astro,mdx,tsx}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-1': 'hsl(var(--surface-1))',
        'surface-2': 'hsl(var(--surface-2))',
        'surface-3': 'hsl(var(--surface-3))',
        'foreground-1': 'hsl(var(--foreground-1))',
        'foreground-2': 'hsl(var(--foreground-2))',
      },
      fontSize: {
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        xxl: 'var(--font-size-xxl)',
        xxxl: 'var(--font-size-xxxl)',
      },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--surface-1': '0 0% 4%',
          '--surface-2': '0 0% 9%',
          '--surface-3': '0 0% 14%',
          '--foreground-1': '0 0% 90%',
          '--foreground-2': '0 0% 66%',
          '--font-size-sm': 'clamp(0.8rem, -0.09vw + 0.82rem, 0.75rem)',
          '--font-size-base': 'clamp(1rem, 0vw + 1rem, 1rem)',
          '--font-size-md': 'clamp(1.25rem, 0.15vw + 1.21rem, 1.33rem)',
          '--font-size-lg': 'clamp(1.56rem, 0.39vw + 1.47rem, 1.78rem)',
          '--font-size-xl': 'clamp(1.95rem, 0.76vw + 1.76rem, 2.37rem)',
          '--font-size-xxl': 'clamp(2.44rem, 1.3vw + 2.12rem, 3.16rem)',
          '--font-size-xxxl': 'clamp(3.05rem, 2.1vw + 2.53rem, 4.21rem)',
        },
      });
    }),
  ],
} satisfies Config;
