const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const path = require("node:path");

let window;

function createWindow() {
    window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, "index.html"));
}

ipcMain.handle("openImage", async (event) => {
    const result = await dialog.showOpenDialog(window, {
        properties: ["openFile"],
        title: "Open image",
        filters: [{extensions: ["jpg", "jpeg", "png", "ico"], name: "image"}],
    });
    console.log(result);
    return result.filePaths[0];
});



app.whenReady().then(() => {
    createWindow();

    if (window === null) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
