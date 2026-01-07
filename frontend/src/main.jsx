import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./utils/AppContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/airbnb-clone">
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
