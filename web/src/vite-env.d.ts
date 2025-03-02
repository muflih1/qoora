/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URI: string
  readonly VITE_APP_API_BASE_URI_V1: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}