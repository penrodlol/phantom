// @ts-nocheck
export { default as ControlSelect } from './components/control-select.astro';
export { default as ControlSwitch } from './components/control-switch.astro';
export { default as Root } from './components/root.astro';

import { z } from 'astro/zod';

export const switchSchema = z.boolean().optional();
export const selectSchema = <T extends string>(values: [T, ...T[]]) => z.enum(values).optional();
export const sizeSchema = selectSchema(['sm', 'md', 'lg']);
export const colorSchema = selectSchema([
  'primary',
  'secondary',
  'accent',
  'neutral',
  'ghost',
  'danger',
]);

export const colors = colorSchema.unwrap()._def.values;
export const sizes = sizeSchema.unwrap()._def.values;

export function buildImports(imports: Array<{ content: string; path: string; hidden?: boolean }>) {
  const _imports = imports
    .filter(({ hidden }) => !hidden)
    .map(({ content, path }) => `import ${content} from '${path}';`)
    .join('\n');
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
