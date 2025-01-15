// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

import { contextBridge } from "electron";
import { readAllSubscriptions, addSubscription } from './database/subscriptionsManager'

contextBridge.exposeInMainWorld("sqlite", {
  readAllSubscriptions,
  addSubscription,
});
