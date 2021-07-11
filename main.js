const electron = require('electron');
const {app, BrowserWindow} = require('electron')

function createMainWindow(){
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow();
  mainWindow.setSimpleFullScreen(true)
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setKiosk(true)
  mainWindow.loadURL("https://google.com")
}

function createSecondaryWindow(){
  var electronScreen = electron.screen;
  var displays = electronScreen.getAllDisplays();
  var externalDisplay = null;
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      externalDisplay = displays[i];
      break;
    }
  }
  if (externalDisplay == null) {
    return;
  }
  
  secondaryWin = new BrowserWindow({ 
    x: externalDisplay.bounds.x,
    y: externalDisplay.bounds.y
  });
  secondaryWin.setSimpleFullScreen(true)
  secondaryWin.setKiosk(true)
  secondaryWin.setMenuBarVisibility(false)
  secondaryWin.loadURL("https://www.google.com/maps")
}

function startLoading(){
  createMainWindow()
  createSecondaryWindow()
}

app.whenReady().then(startLoading)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
