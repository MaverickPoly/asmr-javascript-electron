const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    // Todo operations
    addTodo: (title) => ipcRenderer.invoke('todo:add', title),
    getTodos: () => ipcRenderer.invoke('todo:get'),
    deleteTodo: (id) => ipcRenderer.invoke('todo:delete', id),
    updateTodo: (id, title, completed) => ipcRenderer.invoke('todo:update', {id, title, completed})
});
