const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
    openImage: () => ipcRenderer.invoke("openImage")
});
