const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("node:path");
const TodoDatabase = require("./database");


let window = null;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    window.maximize();

    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:5173")
        window.webContents.openDevTools()
    } else {
        window.loadFile(path.join(__dirname, "renderer/dist/index.html"));
    }

    handleDBFunctions();
}

let db;

function handleDBFunctions() {
    db = new TodoDatabase();

    // Handle todo creation
    ipcMain.handle('todo:add', async (event, title) => {
        return new Promise((resolve, reject) => {
            db.addTodo(title, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    // Handle fetching todos
    ipcMain.handle('todo:get', async () => {
        return new Promise((resolve, reject) => {
            db.getTodos((err, todos) => {
                if (err) reject(err);
                resolve(todos);
            });
        });
    });

    // Handle todo deletion
    ipcMain.handle('todo:delete', async (event, id) => {
        return new Promise((resolve, reject) => {
            db.deleteTodo(id, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });

    // Handle todo updates
    ipcMain.handle('todo:update', async (event, {id, title, completed}) => {
        return new Promise((resolve, reject) => {
            db.updateTodo(id, title, completed, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
}



app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        db.close();
        app.quit();
    }
})

app.on("activate", () => {
    if (window === null) createWindow();
})

