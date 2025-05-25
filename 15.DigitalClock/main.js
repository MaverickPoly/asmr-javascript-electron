const {app, BrowserWindow} = require("electron");


let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow();

    mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});
