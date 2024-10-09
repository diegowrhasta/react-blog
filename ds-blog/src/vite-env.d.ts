/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MOCK_MODE: boolean | string
  readonly VITE_APP_ENV: 'development' | 'production' | 'staging'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
