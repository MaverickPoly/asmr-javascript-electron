const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const QRCode = require("qrcode");

let window = null;

function createWindow() {
    window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.maximize();

    window.loadFile(path.join(__dirname, "index.html"));
}

ipcMain.handle("generateQRCode", async (event, value) => {
    return QRCode.toDataURL(value.toString());
})

app.whenReady().then(createWindow);

app.on("active", () => {
    if (window === null) createWindow();
})
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})
