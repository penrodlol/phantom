// @ts-ignore
import focus from '@alpinejs/focus';

import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.plugin(focus);

  Alpine.magic('setOverflow', () => (show: boolean, target = document.documentElement) => {
    if (show) target.style.removeProperty('overflow');
    else target.style.setProperty('overflow', 'hidden');
  });
};
