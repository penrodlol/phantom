import { onInit, setOverflow } from '@phantom/utils/component';

onInit<HTMLDialogElement>('[data-drawer]', (component) => {
  const openTrigger = component.nextElementSibling as HTMLButtonElement;

  component.addEventListener('close', () => setOverflow(true));
  component.addEventListener('click', (event) => event.target === component && component.close());
  openTrigger?.addEventListener('click', () => (setOverflow(false), component.showModal()));
});
