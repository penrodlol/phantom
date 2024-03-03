/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

interface ImportMetaEnv {
  readonly SOURCE_CODE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}
