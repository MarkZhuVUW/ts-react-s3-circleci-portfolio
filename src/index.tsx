import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { wbInstance } from "./workboxWindow";
// register service worker using workbox-window.
wbInstance && wbInstance.register();
ReactDOM.render(<App />, document.getElementById("root"));
