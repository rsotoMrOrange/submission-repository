import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { NotificationContextProvider } from "./NotificationContext";
import { Provider } from "react-redux";
import store from "./store";
import { injectStore } from "./services/blogs";
import { injectUserStore } from "./services/users";
injectStore(store);
injectUserStore(store);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
