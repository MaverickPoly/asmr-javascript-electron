const {contextBridge, ipcRenderer} =  require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
    showNotification: async (title, content) => ipcRenderer.send("showNotification", title, content),
});
