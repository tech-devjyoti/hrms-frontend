import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { Toaster } from "sonner";
import App from "./App.jsx";
import AuthInitializer from "./app/AuthInitializer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  </StrictMode>,
);
