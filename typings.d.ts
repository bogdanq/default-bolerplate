export {}

declare global {
  export namespace React {}
}

declare const __ENVIRONMENT__: {
  production: boolean
  testing: boolean
  development: boolean
  current: "production" | "testing" | "development"
  buildNumber: number
  commitHash: string
  project: string
  monitor: number
}

declare module "*.jpeg" {
  const value: string
  export default value
}

declare module "*.svg" {
  const value: string
  export default value
}

declare module "*.png" {
  const value: string
  export default value
}

declare module "*.jpg" {
  const value: string
  export default value
}
