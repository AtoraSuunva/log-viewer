declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | string
  }
}
