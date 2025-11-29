import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { FoodProvider } from "./context/FoodContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FoodProvider>
        <App />
      </FoodProvider>
    </AuthProvider>
  </React.StrictMode>
);
9