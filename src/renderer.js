// This file runs in the renderer process

document.addEventListener('DOMContentLoaded', () => {
  // Display version information
  const nodeVersionEl = document.getElementById('node-version');
  const chromeVersionEl = document.getElementById('chrome-version');
  const electronVersionEl = document.getElementById('electron-version');

  if (nodeVersionEl) nodeVersionEl.innerText = process.versions.node;
  if (chromeVersionEl) chromeVersionEl.innerText = process.versions.chrome;
  if (electronVersionEl) electronVersionEl.innerText = process.versions.electron;
});
