// @ts-nocheck
export { default as ControlColor } from './components/control-color.astro';
export { default as ControlSize } from './components/control-size.astro';
export { default as ControlSwitch } from './components/control-switch.astro';
export { default as Root } from './components/root.astro';

import { z } from 'astro/zod';

export const switchSchema = z.boolean().optional();
export const sizeSchema = z.enum(['sm', 'md', 'lg']).optional();
export const colorSchema = z
  .enum(['primary', 'secondary', 'accent', 'neutral', 'ghost', 'danger'])
  .optional();

export function buildImports(imports: Array<{ files: string; path: string }>) {
  const _imports = imports.map(({ files, path }) => `import ${files} from '${path}';`).join('\n');
  return `---\n${_imports}\n---\n`;
}

export function buildProps(props: Record<string, unknown>) {
  return Object.entries(props)
    .map(([key, value]) => {
      switch (typeof value) {
        case 'boolean':
          return value ? key : '';
        case 'string':
          return `${key}="${value}"`;
        case 'number':
          return `${key}={${value}}`;
        case 'object':
          return `${key}={${JSON.stringify(value)}}`;
        default:
          return '';
      }
    })
    .join(' ')
    .trim();
}
