const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    generateQRCode: (value) => ipcRenderer.invoke("generateQRCode", value)
});
