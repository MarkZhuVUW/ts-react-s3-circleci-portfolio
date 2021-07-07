import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { wbInstance } from "./workboxWindow";
// register service worker using workbox-window.
wbInstance && wbInstance.register();
console.log(wbInstance);
ReactDOM.render(<App />, document.getElementById("root"));
