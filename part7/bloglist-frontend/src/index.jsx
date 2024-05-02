import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { injectStore } from "./services/blogs";
import { injectUserStore } from "./services/users";
injectStore(store);
injectUserStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
