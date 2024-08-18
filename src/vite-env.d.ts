/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_FOOTER_TEXT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
