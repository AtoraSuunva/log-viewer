import { cloudflare } from '@cloudflare/vite-plugin'
import svgr from 'vite-plugin-svgr'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig(({ mode }) => ({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: false,
    sortImports: true,
    ignorePatterns: ['dist/**/*', 'src/generated/**/*'],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    categories: {
      correctness: 'error',
      suspicious: 'error',
      perf: 'error',
    },
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'jsdoc', 'promise'],
    rules: {
      'no-param-reassign': 'error',
      'default-param-last': 'error',
      'prefer-enum-initializers': 'error',
      'no-inferrable-types': 'error',
      'no-shadow': 'allow',
      'no-array-sort': 'allow',
      'no-await-in-loop': 'allow',
      'no-unsafe-enum-comparison': 'allow',
      'no-unsafe-type-assertion': 'allow',
      'restrict-template-expressions': 'allow',
      'typescript/consistent-return': 'allow',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  test: {
    passWithNoTests: true,
  },
  plugins: lazyPlugins(() => [...(mode === 'test' ? [] : [cloudflare()]), svgr()]),
  build: {
    sourcemap: true,
  },
}))
