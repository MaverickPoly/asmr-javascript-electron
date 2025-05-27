const {ipcRenderer, contextBridge} = require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
    fetchRandomJoke: async () => ipcRenderer.invoke("fetchRandomJoke")
});
