// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

import { contextBridge } from "electron";
import {
  readAllSubscriptions,
  addSubscription,
  updateSubscriptionComment,
  updateSubscription,
  getSubscriptions,
  getSubscriptionsBackwards,
  getSubscriptionsCount,
  deleteSubscription,
  findSubscriptions,
} from "./database/subscriptionsManager";
import {
  getPersonalCount,
  getPersonal,
  addPersonal,
  deletePersonal,
} from "./database/personalManager";
import {
  getProducts,
  getSupply,
  addProduct,
  addSupply,
  deleteProduct,
  deleteSupply,
  updateSupply,
  updateProduct,
  getSupplyById,
  deleteAllSupply,
} from "./database/productsManager";
import { getPass, addPass, deletePass, editPass } from "./database/passManager";

contextBridge.exposeInMainWorld("sqlite", {
  readAllSubscriptions,
  getSubscriptions,
  getSubscriptionsCount,
  addSubscription,
  updateSubscriptionComment,
  updateSubscription,
  getSubscriptionsBackwards,
  deleteSubscription,
  findSubscriptions,
  getPersonalCount,
  getPersonal,
  addPersonal,
  deletePersonal,
  getProducts,
  getSupply,
  addProduct,
  addSupply,
  deleteProduct,
  deleteSupply,
  updateSupply,
  updateProduct,
  deleteAllSupply,
  getSupplyById,
  getPass,
  addPass,
  deletePass,
  editPass,
});
