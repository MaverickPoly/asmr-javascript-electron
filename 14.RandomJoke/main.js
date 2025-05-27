const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const {fetchRandomJoke} = require("./jokeAPI");

let window = null;


const createWindow = () => {
    window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, "index.html"));
}


ipcMain.handle("fetchRandomJoke", (event) => fetchRandomJoke())

app.whenReady().then(() => createWindow());

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
