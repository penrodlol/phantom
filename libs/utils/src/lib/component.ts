export type OnInitDefaultElement = HTMLElement;
export type OnInitSelector = string;
export type OnInitCallback<T extends OnInitDefaultElement> = (element: T, event: Event) => void;

export function onInit<T extends OnInitDefaultElement>(
  selector: OnInitSelector,
  callback: OnInitCallback<T>,
) {
  document.addEventListener('astro:page-load', (event) =>
    document.querySelectorAll<T>(selector).forEach((component) => callback(component, event)),
  );
}

export function setOverflow(show: boolean, target = document.documentElement) {
  if (show) target.style.removeProperty('overflow');
  else target.style.setProperty('overflow', 'hidden');
}
