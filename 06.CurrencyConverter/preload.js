const {ipcRenderer, contextBridge} = require("electron");


contextBridge.exposeInMainWorld("electron", {
    getCurrencyRates: () => ipcRenderer.invoke("getCurrencyRates")
});

