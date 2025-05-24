const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const {getCurrencyRates} = require("./currency");


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
       webPreferences: {
            preload: path.join(__dirname, "preload.js")
       },
        title: "Currency Converter"
    });


    mainWindow.loadFile(path.join(__dirname, "index.html"));

    ipcMain.handle("getCurrencyRates", (event) => getCurrencyRates())
}

app.on("ready", () => {
    createWindow();

    if (!mainWindow) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

