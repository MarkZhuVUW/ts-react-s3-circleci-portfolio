import { Workbox } from "workbox-window";

// Return false if browser does not support service worker, otherwise return the workbox window instance.
export const wbInstance =
  "serviceWorker" in navigator && new Workbox("/service-worker.js");
