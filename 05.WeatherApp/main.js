const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const {getWeatherData} = require("./weather");

let window;

function createWindow() {
    window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
        title: "Weather App"
    });

    window.loadFile(path.join(__dirname, "index.html"));

    ipcMain.handle("fetchWeather", (event, city)=> {
        console.log("Fetch Weather city:", city);
        return getWeatherData(city)
    });
}

app.on("ready", () => {
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
