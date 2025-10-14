import "./polyfills";
import React from "react";
import { createRoot } from 'react-dom/client';

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import Login from "./DemoPages/UserPages/Login";
import configureAppStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureAppStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Component />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

const root = createRoot(rootElement);
root.render(renderApp(Login));

// if (module.hot) {
//   module.hot.accept("./DemoPages/Main", () => {
//     const NextApp = require("./DemoPages/Main").default;
//     root.render(renderApp(NextApp));
//   });
// }
if (import.meta.hot) {
  import.meta.hot.accept("./DemoPages/Main", (newModule) => {
    root.render(renderApp(newModule.default));
  });
}


serviceWorker.unregister();