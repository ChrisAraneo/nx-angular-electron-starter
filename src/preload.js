const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: send a message to main process
  // sendMessage: (message) => ipcRenderer.send('message', message),
  
  // Example: receive a message from main process
  // onMessage: (callback) => ipcRenderer.on('message', callback)
});
