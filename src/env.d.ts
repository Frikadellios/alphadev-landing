/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/icon.d.ts" />
/// <reference types="astro/client" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

declare module '*.astro' {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const Component: any
  export default Component
}
