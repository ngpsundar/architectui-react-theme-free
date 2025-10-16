import "./polyfills";
import React, { Suspense, lazy, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import Login from "./DemoPages/UserPages/Login";
import configureAppStore from "./config/configureStore";
import { Provider } from "react-redux";
import Loader from "react-loaders";
// ✅ Import ValidationProvider
import { ValidationProvider } from "./Context/ValidationContext";
import AppMain from "./Layout/AppMain";
const UserPages = lazy(() => import("./DemoPages/UserPages"));

const store = configureAppStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* ✅ Wrap your entire app inside ValidationProvider */}
        <ValidationProvider>
          <Component />
        </ValidationProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

const IndexMain = () => {

    return (
        <Fragment>
            <Routes>
                {/* login */}
                <Route path="/auth/*" element={
                    <Suspense fallback={
                        <div className="loader-container">
                            <div className="loader-container-inner">
                                <div className="text-center">
                                    <Loader type="ball-pulse"/>
                                </div>
                                <h6 className="mt-3">
                                    Please wait while we load all the Applications examples
                                    <small>Because this is a demonstration we load at once all the Applications examples. This wouldn't happen in a real live app!</small>
                                </h6>
                            </div>
                        </div>
                    }>
                        <UserPages />
                    </Suspense>
                } />

                 {/* appmain */}
                <Route path="/*" element={
                    <Suspense fallback={
                        <div className="loader-container">
                            <div className="loader-container-inner">
                                <div className="text-center">
                                    <Loader type="ball-pulse"/>
                                </div>
                                <h6 className="mt-3">
                                    Please wait while we load all the Applications examples
                                    <small>Because this is a demonstration we load at once all the Applications examples. This wouldn't happen in a real live app!</small>
                                </h6>
                            </div>
                        </div>
                    }>
                       <Main />
                    </Suspense>
                } />
                </Routes>


                </Fragment>
    )
}

const root = createRoot(rootElement);

// ✅ Change this to switch between Main and Login as landing page
root.render(renderApp(IndexMain));  // or renderApp(Main)

// if (import.meta.hot) {
//   import.meta.hot.accept("./DemoPages/Main", (newModule) => {
//     root.render(renderApp(newModule.default));
//   });
// }

serviceWorker.unregister();
