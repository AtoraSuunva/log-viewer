import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  plugins: [
    cloudflare(),
    svgr(),
  ]
})
