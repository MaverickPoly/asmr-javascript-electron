const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const {markdownToHtml} = require("./markdown");


function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    mainWindow.maximize(); // Make a window full screen

    ipcMain.handle("toHtml", (event, text) => markdownToHtml(text));
}


app.whenReady().then(() => {
    createWindow();

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})


