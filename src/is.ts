import { platform } from '@tauri-apps/api/os'

export const is = {
  async macos() {
    return await platform() === 'darwin'
  },
  async windows() {
    return await platform() === 'win32'
  },
  async linux() {
    return await platform() === 'linux'
  },
  async production() {
    try {
      // https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
      // @ts-expect-error Default to vite environment of environment variables
      return import.meta.env.MODE === 'production'
    }
    catch (_) {
      return process.env.NODE_ENV === 'production'
    }
  },
  async development() {
    try {
      // https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
      // @ts-expect-error Default to vite environment of environment variables
      return import.meta.env.MODE === 'development'
    }
    catch (_) {
      return process.env.NODE_ENV === 'development'
    }
  },
}
