/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SOURCE_CODE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}
