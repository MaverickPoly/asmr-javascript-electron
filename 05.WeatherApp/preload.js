const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("electron", {
    getData: async (channel, ...args) => ipcRenderer.invoke(channel, ...args),
})
