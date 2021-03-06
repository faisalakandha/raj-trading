/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import AuthWindow from '../backend/oauth';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const myElectron = require('electron');
import db from '../backend/models/index';
const fyers = require('fyers-api-v2');

fyers.setAppId('FMR00CRGAK-100');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Main DB Connected Successfully');
  });

const AuthSession = db.mongoose.model('session');

require('../backend/index');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const { width, height } = myElectron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    try {
      await AuthSession.deleteMany();
      console.log('Auth Data successfully deleted');
    } catch (err) {
      console.log(err);
    }

    db.Session.watch().on('change', (data) => {
      console.log(data);
      mainWindow.webContents.send('event:dbChange', 'DBChange');
    });

    createWindow();
    mainWindow?.maximize();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.handle('event:OpentAuthWindow', async (event, args) => {
  return new Promise(async (resolve, reject) => {
    await AuthWindow()
      .then(async (result) => {
        if (result == true) {
          resolve(true);
        } else {
          resolve(false);
          reject('AUTHENTICATION FAILED !');
        }
      })
      .catch('Auth Failure Error');
  });
});

ipcMain.handle('event:GetAuthToken', (event, arg) => {
  console.log(arg);
  return arg;
});

const reqBody = {
  dataType: 'orderUpdate'
};

ipcMain.on('event:messageFromRenderer', (event, title) => {
  AuthSession.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
    .then(data => {
      console.log('DB DATA FROM place-order API: ', data.access);

      fyers.setAccessToken(data.access);
      const reqBody2 = {
        symbol: ["NSE:JINDALSTEL-EQ"],

        dataType: 'symbolUpdate'

      }

      fyers.fyers_connect(reqBody2, function (data) {
        console.log('Market Data: ', data)
        //write your code here
        mainWindow?.webContents.send('event:orderData', data);
      })
    })
})
