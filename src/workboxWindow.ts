import { Workbox } from "workbox-window";
export const wbInstance =
  process.env.NODE_ENV === "production" && new Workbox("/service-worker.js");
