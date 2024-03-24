import type { Element } from 'hast';
import { select as hastUtilSelect, selectAll as hastUtilSelectAll } from 'hast-util-select';
import { rehype } from 'rehype';

export type RenderProps = Record<string, Record<string, RenderPropCallback>>;
export type RenderPropCallback = (props: RenderProp) => string | number | boolean;
export type RenderProp = Record<string, string | number | boolean | null | undefined> & {
  id: ReturnType<typeof crypto.randomUUID>;
  node: Element;
  nodes: Array<Element>;
  index: number;
  first: boolean;
  last: boolean;
};

export type SelectResponse = ReturnType<typeof select>;
export type SelectAllResponse = ReturnType<typeof selectAll>;
export type GetPropsResponse = NonNullable<ReturnType<typeof select>>['properties'];

export function render(html: string, props: RenderProps) {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(() => (root: Element) => {
      const id = crypto.randomUUID();

      Object.entries(props).forEach(([selector, _props]) => {
        hastUtilSelectAll(selector, root).forEach((node, index, nodes) => {
          Object.entries(_props).forEach(([key, value]) => {
            if (!node.properties) return;

            const props = node.properties ?? {};
            const first = index === 0;
            const last = index === nodes.length - 1;

            // @ts-expect-error
            node.properties[key] = `${value({ id, node, nodes, index, first, last, ...props })}`;
          });
        });
      });
    });

  return String(processor.processSync(html).value);
}

export const select = (html: string, selector: string) =>
  hastUtilSelect(selector, rehype().parse(html));

export const selectAll = (html: string, selector: string) =>
  hastUtilSelectAll(selector, rehype().parse(html));

export const getProps = <T extends GetPropsResponse>(...args: Parameters<typeof select>) =>
  (select(...args)?.properties ?? {}) as T;
