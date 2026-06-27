/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly IS_LOCAL: string
  readonly WORKERS_CI_BRANCH?: string
  readonly WORKERS_CI_COMMIT_SHA?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
