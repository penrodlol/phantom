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
      fontFamily: { sans: ['SF Pro Text', ...theme.fontFamily.sans] },
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
        'surface-backdrop': 'hsl(var(--surface-backdrop))',
        'surface-primary': 'hsl(var(--surface-primary))',
        'surface-secondary': 'hsl(var(--surface-secondary))',
        'surface-accent': 'hsl(var(--surface-accent))',
        'surface-neutral': 'hsl(var(--surface-neutral))',
        'surface-danger': 'hsl(var(--surface-danger))',
        'foreground-1': 'hsl(var(--foreground-1))',
        'foreground-2': 'hsl(var(--foreground-2))',
        'foreground-primary': 'hsl(var(--foreground-primary))',
        'foreground-primary-outline': 'hsl(var(--foreground-primary-outline))',
        'foreground-secondary': 'hsl(var(--foreground-secondary))',
        'foreground-secondary-outline': 'hsl(var(--foreground-secondary-outline))',
        'foreground-accent': 'hsl(var(--foreground-accent))',
        'foreground-accent-outline': 'hsl(var(--foreground-accent-outline))',
        'foreground-neutral': 'hsl(var(--foreground-neutral))',
        'foreground-neutral-outline': 'hsl(var(--foreground-neutral-outline))',
        'foreground-danger': 'hsl(var(--foreground-danger))',
        'foreground-danger-outline': 'hsl(var(--foreground-danger-outline))',
      },
      borderRadius: { DEFAULT: 'var(--radius)' },
      borderColor: { DEFAULT: 'hsl(var(--border))' },
      ringColor: { DEFAULT: 'hsl(var(--ring))' },
      boxShadow: { DEFAULT: 'var(--shadow)' },
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addBase }) => {
      const addFont = (src: string, weight: string) =>
        addBase({
          '@font-face': {
            fontFamily: 'SF Pro Text',
            src: `url("${src}") format("opentype")`,
            fontWeight: weight,
            fontStyle: 'normal',
            fontDisplay: 'swap',
          },
        });
      addFont('/SF-Pro-Text-Regular.otf', '400');
      addFont('/SF-Pro-Text-Medium.otf', '500');
      addFont('/SF-Pro-Text-Semibold.otf', '600');

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
          '--radius': '0.25rem',
          '--scrollbar-thumb': 'hsl(var(--surface-3))',
          '--scrollbar-thumb-radius': 'var(--radius)',
          '--scrollbar-track-radius': 'var(--radius)',
          '--scrollbar-track': 'transparent',
        },
        '[color-scheme="light"]': {
          'color-scheme': 'light',

          '--surface-1': '0 0% 90%',
          '--surface-2': '0 0% 85%',
          '--surface-3': '0 0% 80%',
          '--surface-primary': '0 0% 15%',
          '--surface-secondary': '0 0% 74%',
          '--surface-accent': '0 0% 74%',
          '--surface-neutral': '0 0% 74%',
          '--surface-danger': '356 51% 75%',

          '--foreground-1': '0 0% 2%',
          '--foreground-2': '0 0% 45%',
          '--foreground-primary': '0 0% 92%',
          '--foreground-primary-outline': '0 0% 20%',
          '--foreground-secondary': '0 0% 20%',
          '--foreground-secondary-outline': '0 0% 20%',
          '--foreground-accent': '0 0% 20%',
          '--foreground-accent-outline': '0 0% 20%',
          '--foreground-neutral': '0 0% 20%',
          '--foreground-neutral-outline': '0 0% 20%',
          '--foreground-danger': '0 0% 10%',
          '--foreground-danger-outline': '356 65% 23%',

          '--border': '0 0% 60%',
          '--ring': '0 0% 10%',

          '::backdrop': { '--surface-backdrop': '0 0% 20%' },
        },
        '[color-scheme="warm"]': {
          'color-scheme': 'light',

          '--surface-1': '43 18% 89%',
          '--surface-2': '43 18% 85%',
          '--surface-3': '43 18% 82%',
          '--surface-primary': '0 0% 15%',
          '--surface-secondary': '0 0% 80%',
          '--surface-accent': '0 0% 80%',
          '--surface-neutral': '0 0% 80%',
          '--surface-danger': '356 51% 75%',

          '--foreground-1': '0 0% 20%',
          '--foreground-2': '0 0% 45%',
          '--foreground-primary': '0 0% 92%',
          '--foreground-primary-outline': '0 0% 20%',
          '--foreground-secondary': '0 0% 20%',
          '--foreground-secondary-outline': '0 0% 20%',
          '--foreground-accent': '0 0% 20%',
          '--foreground-accent-outline': '0 0% 20%',
          '--foreground-neutral': '0 0% 20%',
          '--foreground-neutral-outline': '0 0% 20%',
          '--foreground-danger': '0 0% 10%',
          '--foreground-danger-outline': '356 65% 23%',

          '--border': '0 0% 60%',
          '--ring': '0 0% 10%',

          '::backdrop': { '--surface-backdrop': '0 0% 20%' },
        },
        '[color-scheme="dark"]': {
          'color-scheme': 'dark',

          '--surface-1': '0 0% 2%',
          '--surface-2': '0 0% 8%',
          '--surface-3': '0 0% 14%',
          '--surface-primary': '0 0% 95%',
          '--surface-secondary': '0 0% 22%',
          '--surface-accent': '0 0% 22%',
          '--surface-neutral': '0 0% 22%',
          '--surface-danger': '356 41% 30%',

          '--foreground-1': '0 0% 90%',
          '--foreground-2': '0 0% 55%',
          '--foreground-primary': '0 0% 4%',
          '--foreground-primary-outline': '0 0% 95%',
          '--foreground-secondary': '0 0% 80%',
          '--foreground-secondary-outline': '0 0% 80%',
          '--foreground-accent': '0 0% 80%',
          '--foreground-accent-outline': '0 0% 80%',
          '--foreground-neutral': '0 0% 80%',
          '--foreground-neutral-outline': '0 0% 80%',
          '--foreground-danger': '0 0% 96%',
          '--foreground-danger-outline': '356 41% 60%',

          '--border': '0 0% 30%',
          '--ring': '0 0% 80%',

          '--astro-code-background': 'hsl(0 0% 0%)',
          '--astro-code-foreground': 'hsl(0 0% 90%)',
          '--astro-code-color-background': 'hsl(0 0% 0%)',
          '--astro-code-color-text': 'hsl(0 0% 90%)',
          '--astro-code-token-constant': 'hsl(0 0% 59%)',
          '--astro-code-token-string': 'hsl(0 0% 70%)',
          '--astro-code-token-comment': 'hsl(0 0% 31%)',
          '--astro-code-token-keyword': 'hsl(0 0% 59%)',
          '--astro-code-token-parameter': 'hsl(0 0% 90%)',
          '--astro-code-token-function': 'hsl(0 0% 90%)',
          '--astro-code-token-string-expression': 'hsl(0 0% 70%)',
          '--astro-code-token-punctuation': 'hsl(0 0% 90%)',
          '--astro-code-token-link': 'hsl(0 0% 59%)',

          '::backdrop': { '--surface-backdrop': '0 0% 3%' },
        },
        '[color-scheme="dim"]': {
          'color-scheme': 'dark',

          '--surface-1': '0 0% 10%',
          '--surface-2': '0 0% 14%',
          '--surface-3': '0 0% 18%',
          '--surface-primary': '0 0% 85%',
          '--surface-secondary': '0 0% 25%',
          '--surface-accent': '0 0% 25%',
          '--surface-neutral': '0 0% 25%',
          '--surface-danger': '356 41% 30%',

          '--foreground-1': '0 0% 80%',
          '--foreground-2': '0 0% 50%',
          '--foreground-primary': '0 0% 4%',
          '--foreground-primary-outline': '0 0% 95%',
          '--foreground-secondary': '0 0% 70%',
          '--foreground-secondary-outline': '0 0% 70%',
          '--foreground-accent': '0 0% 70%',
          '--foreground-accent-outline': '0 0% 70%',
          '--foreground-neutral': '0 0% 70%',
          '--foreground-neutral-outline': '0 0% 70%',
          '--foreground-danger': '0 0% 96%',
          '--foreground-danger-outline': '356 41% 60%',

          '--border': '0 0% 30%',
          '--ring': '0 0% 70%',

          '::backdrop': { '--surface-backdrop': '0 0% 3%' },
        },
      });
    }),
  ],
} satisfies Config;
