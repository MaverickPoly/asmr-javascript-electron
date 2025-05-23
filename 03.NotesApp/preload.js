const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("db", {
    addNote: async (title) => ipcRenderer.invoke("addNote", title),
    getNotes: async () => ipcRenderer.invoke("getNotes"),
    updateNote: async (id, title) => ipcRenderer.invoke("updateNote", id, title),
    deleteNote: async (id) => ipcRenderer.invoke("deleteNote", id),
});
