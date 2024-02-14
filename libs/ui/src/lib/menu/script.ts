import { onInit } from '@phantom/utils/component';

type Menu = HTMLDivElement;
type Overlay = HTMLDivElement;
type Trigger = HTMLButtonElement;
type Content = HTMLDivElement;
type Item = HTMLDivElement;
type Items = NodeListOf<Item>;
type Targets = { menu: Menu; trigger: Trigger; content: Content; items: Items };

const itemsSelector =
  '[role="menuitem"]:not([data-menubar-trigger]),[role="menuitemcheckbox"],[role="menuitemradio"]';
const triggersSelector = '[slot="menu-trigger"],[data-menubar-trigger]';

onInit<Menu>('[data-menu]', (menu) => {
  const overlay = menu.querySelector<Overlay>('[data-overlay]');
  const trigger = menu.querySelector<Trigger>(triggersSelector);
  const content = menu.querySelector<Content>('[role="menu"]');
  const items = menu.querySelectorAll<Item>(itemsSelector);
  if (!overlay || !trigger || !content || !items) return;

  const targets: Targets = { menu, trigger, content, items };
  let searchQuery = '';
  let searchDebouncer!: number;
  const searchCollection = Array.from(items).map((item) => ({
    text: item.textContent?.toLowerCase().trim(),
    element: item,
  }));

  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', content.id);
  content.setAttribute('aria-labelledby', trigger.id);
  items.forEach((item, index) => item.setAttribute('data-index', `${index}`));

  overlay.addEventListener('click', () => setOpen(targets, false));
  trigger.addEventListener('click', () => setOpen(targets));
  trigger.addEventListener('keydown', (event) => {
    // prettier-ignore
    switch (event.key) {
      case 'Up': case 'ArrowUp': return onTriggerArrowUp(event, targets);
      case 'Down': case 'ArrowDown': return onTriggerArrowDown(event, targets);
      default: return;
    }
  });

  content.addEventListener('click', (event) => {
    setOpen(targets, false);
    const item = getClosestItem(event);
    if (item) setChecked(item);
  });

  content.addEventListener('mouseover', (event) => {
    const item = getClosestItem(event);
    if (item) focusItem(targets, item);
  });

  content.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;

    if (isSearchKey(event)) {
      if (typeof searchDebouncer === 'number') window.clearTimeout(searchDebouncer);
      searchDebouncer = window.setTimeout(() => (searchQuery = ''), 500);
      searchQuery += event.key.toLowerCase().trim();

      const item = searchCollection.find((item) => item.text?.startsWith(searchQuery));
      focusItem(targets, item?.element ?? targets.items.item(0));
      return;
    }

    if (event.shiftKey) return event.key === 'Tab' && setOpen(targets, false);

    // prettier-ignore
    switch (event.key) {
      case 'Up': case 'ArrowUp': return onContentArrowUp(event, targets);
      case 'Down': case 'ArrowDown': return onContentArrowDown(event, targets);
      case 'Home': return onContentHome(event, targets);
      case 'End': return onContentEnd(event, targets);
      case 'Enter': case ' ': return onContentEnterOrSpace(event, targets);
      case 'Esc': case 'Escape': return onContentEscape(event, targets);
      case 'Tab': return setOpen(targets, false);
      default: return;
    }
  });
});

function getFocusedItem({ content }: Targets) {
  const id = content.getAttribute('aria-activedescendant');
  return content.querySelector<Item>(`[id="${id}"]`);
}

function getClosestItem(event: MouseEvent) {
  return (event.target as HTMLElement).closest<Item>(itemsSelector);
}

function isSearchKey(event: KeyboardEvent) {
  return event.key.length === 1 && event.key.match(/\S/);
}

function removeFocusedItem({ content }: Targets) {
  content.querySelector<Item>('[data-focused="true"]')?.setAttribute('data-focused', 'false');
}

function setOpen(targets: Targets, override?: boolean) {
  const next = override ?? targets.menu.getAttribute('data-open') !== 'true';
  targets.menu.setAttribute('data-open', `${next}`);
  targets.trigger.setAttribute('aria-expanded', `${next}`);
  if (next) removeFocusedItem(targets), targets.content.focus();
  else targets.content.setAttribute('aria-activedescendant', '');
}

function setChecked(item: Item) {
  // prettier-ignore
  switch (item.role) {
    case 'menuitemcheckbox':
        return item.setAttribute('aria-checked', `${item.ariaChecked !== 'true'}`);
    case 'menuitemradio': {
      const checked = item.parentElement?.querySelector(`${itemsSelector}[aria-checked=true]`);
      checked?.setAttribute('aria-checked', 'false');
      return item.setAttribute('aria-checked', 'true');
    }
    default: return;
  }
}

function focusItem(targets: Targets, item: Item) {
  removeFocusedItem(targets);
  targets.content.setAttribute('aria-activedescendant', item.id);
  item.setAttribute('data-focused', 'true');
  item.scrollIntoView({ block: 'nearest' });
}

// ------------------------ KEYBOARD EVENTS ------------------------ //

function onTriggerArrowUp(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  setOpen(targets, true);
  focusItem(targets, targets.items.item(targets.items.length - 1));
}

function onTriggerArrowDown(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  setOpen(targets, true);
  focusItem(targets, targets.items.item(0));
}

function onContentArrowUp(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  const previous = targets.items.item(Number(getFocusedItem(targets)?.dataset.index) - 1);
  focusItem(targets, previous ?? targets.items.item(targets.items.length - 1));
}

function onContentArrowDown(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  const next = targets.items.item(Number(getFocusedItem(targets)?.dataset.index) + 1);
  focusItem(targets, next ?? targets.items.item(0));
}

function onContentHome(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  focusItem(targets, targets.items.item(0));
}

function onContentEnd(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  focusItem(targets, targets.items.item(targets.items.length - 1));
}

function onContentEnterOrSpace(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  const focused = getFocusedItem(targets);
  if (focused) setChecked(focused);
  setOpen(targets);
  if (targets.menu.dataset.open === 'false') targets.trigger.focus();
}

function onContentEscape(event: KeyboardEvent, targets: Targets) {
  event.preventDefault();
  setOpen(targets, false);
  targets.trigger.focus();
}

// ----------------------------------------------------------------- //
