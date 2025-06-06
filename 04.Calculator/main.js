const {app, BrowserWindow} = require("electron");


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "Calculator"
    });

    mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

