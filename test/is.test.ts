import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { clearMocks, mockIPC } from '@tauri-apps/api/mocks'
import { is } from '../src/is'

type TauriModule =
| 'App'
| 'Fs'
| 'Path'
| 'Os'
| 'Window'
| 'Shell'
| 'Event'
| 'Internal'
| 'Dialog'
| 'Cli'
| 'Notification'
| 'Http'
| 'GlobalShortcut'
| 'Process'
| 'Clipboard'
interface TauriCommand {
  __tauriModule: TauriModule
  [key: string]: any
}

beforeAll(() => {
  mockIPC((cmd, args) => {
    if (cmd === 'tauri') {
      if (args.__tauriModule === 'Os') {
        switch ((args as TauriCommand).message.cmd) {
          case 'platform':
            return process.platform
          default:
            return ''
        }
      }
    }
    return undefined
  })
})
afterAll(() => {
  clearMocks()
})

describe('is', () => {
  it('is.macos', () => {
    expect(is.macos()).resolves.toBe(process.platform === 'darwin')
  })
  it('is.windows', () => {
    expect(is.windows()).resolves.toBe(process.platform === 'win32')
  })
  it('is.linux', () => {
    expect(is.linux()).resolves.toBe(process.platform === 'linux')
  })
  it('is.development', () => {
    expect(is.development()).resolves.toBe(process.env.NODE_ENV === 'development')
  })
  it('is.production', () => {
    expect(is.production()).resolves.toBe(process.env.NODE_ENV === 'production')
  })
})
