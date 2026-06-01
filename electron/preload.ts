import { contextBridge, ipcRenderer } from 'electron'

const bavioDesktop = {
  platform: process.platform,
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
  ping: () => ipcRenderer.invoke('app:ping') as Promise<string>,
  rendererReady: () => ipcRenderer.send('renderer:ready'),
}

contextBridge.exposeInMainWorld('bavioDesktop', bavioDesktop)

export type BavioDesktopApi = typeof bavioDesktop
