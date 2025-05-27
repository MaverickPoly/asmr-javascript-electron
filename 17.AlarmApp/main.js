import {app, BrowserWindow, ipcMain} from "electron";
import {showNotification} from "./notification.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));
    win.webContents.openDevTools();
}

ipcMain.on("showNotification", (_, title, content) => {
    showNotification(title, content);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
