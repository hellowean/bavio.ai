import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { appendFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const devServerUrl = process.env.VITE_DEV_SERVER_URL
const appId = 'com.bavio.desktop'
const productionLogPath = path.join(app.getPath('userData'), 'logs', 'production.log')
const runtimeIconPath = app.isPackaged
  ? path.join(process.resourcesPath, 'icon.png')
  : path.join(__dirname, '../build/icon.png')

app.setName('Bavio')
app.setAppUserModelId(appId)

function writeProductionLog(message: string, details?: unknown) {
  if (!app.isPackaged) {
    return
  }

  try {
    mkdirSync(path.dirname(productionLogPath), { recursive: true })
    const serializedDetails =
      details instanceof Error ? details.stack ?? details.message : details
    const suffix = serializedDetails ? ` ${JSON.stringify(serializedDetails)}` : ''

    appendFileSync(productionLogPath, `[${new Date().toISOString()}] ${message}${suffix}\n`)
  } catch {
    // Logging must never prevent the app window from opening.
  }
}

process.on('uncaughtException', (error) => {
  writeProductionLog('Uncaught main-process exception', error)
})

process.on('unhandledRejection', (reason) => {
  writeProductionLog('Unhandled main-process rejection', reason)
})

ipcMain.handle('app:ping', () => 'pong')

async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    title: 'Bavio',
    icon: runtimeIconPath,
    backgroundColor: '#0D0D1A',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  mainWindow.removeMenu()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  let hasRevealedLoadFailure = false
  const revealLoadFailure = (message: string, details?: unknown) => {
    writeProductionLog(message, details)

    if (!app.isPackaged || hasRevealedLoadFailure) {
      return
    }

    hasRevealedLoadFailure = true
    mainWindow.show()
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  const rendererReadyTimeout = devServerUrl
    ? undefined
    : setTimeout(() => {
        revealLoadFailure('Renderer did not mount within 8 seconds')
      }, 8_000)

  const handleRendererReady = (event: Electron.IpcMainEvent) => {
    if (event.sender !== mainWindow.webContents) {
      return
    }

    clearTimeout(rendererReadyTimeout)
    writeProductionLog('Renderer mounted successfully')
  }

  ipcMain.on('renderer:ready', handleRendererReady)

  mainWindow.once('closed', () => {
    clearTimeout(rendererReadyTimeout)
    ipcMain.off('renderer:ready', handleRendererReady)
  })

  mainWindow.webContents.on(
    'did-fail-load',
    (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      if (isMainFrame && errorCode !== -3) {
        revealLoadFailure('Renderer failed to load', {
          errorCode,
          errorDescription,
          validatedURL,
        })
      }
    },
  )

  mainWindow.webContents.on('preload-error', (_event, preloadPath, error) => {
    revealLoadFailure('Preload script failed', { preloadPath, error: error.stack })
  })

  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    revealLoadFailure('Renderer process exited unexpectedly', details)
  })

  mainWindow.webContents.on('console-message', (details) => {
    if (details.level === 'error') {
      writeProductionLog('Renderer console error', {
        message: details.message,
        lineNumber: details.lineNumber,
        sourceId: details.sourceId,
      })
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    writeProductionLog('Renderer loaded successfully', {
      url: mainWindow.webContents.getURL(),
    })
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)

    return { action: 'deny' }
  })

  if (devServerUrl) {
    await mainWindow.loadURL(devServerUrl)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
    return
  }

  const rendererPath = path.join(app.getAppPath(), 'dist', 'index.html')
  writeProductionLog('Loading production renderer', { rendererPath })

  try {
    await mainWindow.loadFile(rendererPath)
  } catch (error) {
    revealLoadFailure('Unable to open production renderer', error)
  }
}

app.whenReady().then(() => {
  void createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
