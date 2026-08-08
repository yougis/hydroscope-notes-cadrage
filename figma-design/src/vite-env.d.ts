/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string
  export default content
}

declare const __MAPBOX_TOKEN__: string
declare const __GOOGLE_KEY__: string
