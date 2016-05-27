'use strict';

const electron      = require('electron');

const Application   = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const MenuItem      = electron.MenuItem;

var mainWindow      = null;

Application.on('window-all-closed', () => {
  if(process.platform != 'darwin') Application.quit();
});

Application.on('ready', () => {
  mainWindow = new BrowserWindow({
    "width": 800,
    "height": 600,
    "center": true
    //title: 'VirtualFence',
    //icon: __dirname + '/images/app.png'
  });
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => { mainWindow = null; });
});

let menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Setting',
        click: () => {}
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        role: 'close'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Refresh',
        click: (item, focusedWindow) => {
          if(focusedWindow) focusedWindow.reload();
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'View Term of Use'
      },
      {
        label: 'View License'
      },
      {
        label: 'Version 1.0.0',
        enabled: false
      },
      {
        type: 'separator'
      },
      {
        label: 'About VirtualFence',
        click: () => {}
      }
    ]
  }
];
let menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
