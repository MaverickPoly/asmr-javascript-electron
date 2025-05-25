const {contextBridge, ipcRenderer} = require("electron");


contextBridge.exposeInMainWorld("markdown", {
    toHtml: (text) => ipcRenderer.invoke("toHtml", text)
});
