const {app, BrowserWindow} = require("electron");
const path = require("node:path");


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on("window-all-closed", () => {
    if (process.platform === "darwin") {
        app.quit();
    }
})
