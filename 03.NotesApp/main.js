const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const NotesDatabase = require("./database");

let db;

function createWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    window.loadFile(path.join(__dirname, "index.html"));

    // Database
    handleDbFunctions();
}

function handleDbFunctions() {
    db = new NotesDatabase();

    ipcMain.handle("addNote", (event, title) => {
        return new Promise((resolve, reject) => db.addNote(
            title, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ))
    })
    ipcMain.handle("getNotes", (event) => {
        return new Promise((resolve, reject) => db.getNotes(
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ))
    })
    ipcMain.handle("updateNote", (event, id, title) => {
        return new Promise((resolve, reject) => db.updateNote(
            id, title, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ))
    })
    ipcMain.handle("deleteNote", (event, id) => {
        return new Promise((resolve, reject) => db.deleteNote(
            id, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ))
    })
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on("window-all-closed", () => {
    if (db) db.close();
    if (process.platform !== "darwin") {
        app.quit();
    }
})
