// @ts-ignore
import focus from '@alpinejs/focus';
// @ts-ignore
import collapse from '@alpinejs/collapse';

import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.plugin([focus, collapse]);

  Alpine.magic('setOverflow', () => (show: boolean, target = document.documentElement) => {
    if (show) target.style.removeProperty('overflow');
    else target.style.setProperty('overflow', 'hidden');
  });

  Alpine.data('partial', () => ({
    submit: (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      const url = form.dataset.partial as string;

      fetch(url, { method: 'POST', body: new FormData(form) }).then(async (response) => {
        const htmlString = await response.text();
        const html = new DOMParser().parseFromString(htmlString, 'text/html');
        const partial = html.querySelector('[data-partial]');
        if (partial) form.replaceWith(partial);
      });
    },
  }));
};
