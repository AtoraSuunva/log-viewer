/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly IS_LOCAL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
