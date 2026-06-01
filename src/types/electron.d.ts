type BavioDesktopApi = {
  platform: string
  versions: {
    chrome: string
    electron: string
    node: string
  }
  ping: () => Promise<string>
  rendererReady: () => void
}

declare global {
  interface Window {
    bavioDesktop?: BavioDesktopApi
  }
}

export {}
