import * as path from 'node:path';
import * as url from 'node:url';

import { app, BrowserWindow, screen } from 'electron';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.includes('--serve');

async function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (serve) {
    // Dynamic import for electron-reload in serve mode
    try {
      const electronReload = await import('electron-reload');
      electronReload.default(__dirname, {
        electron: path.join(
          __dirname,
          '/../../../',
          'node_modules',
          '.bin',
          'electron',
        ),
        hardResetMethod: 'exit',
      });
    } catch (error) {
      console.error('electron-reload not available', error);
    }
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(
          __dirname,
          '/../../../',
          'dist/apps/browser/index.html',
        ),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // In an array if your app supports multi windows, this is the time
    // When you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // Initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // To stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // Dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (error) {
  console.error('Error during app initialization', error);
}
