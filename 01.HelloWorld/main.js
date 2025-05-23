const {app, BrowserWindow} = require("electron");
const path = require("node:path");

let window;

function createWindow() {
    window = new BrowserWindow({});

    window.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (window === null) {
            createWindow();
        }
    })
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})
