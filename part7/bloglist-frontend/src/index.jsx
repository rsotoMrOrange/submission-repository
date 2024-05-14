import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";

// To be used when switching to redux

/* import { Provider } from "react-redux";
import store from "./store";
import { injectStore } from "./services/blogs";
injectStore(store); */

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>,
);
