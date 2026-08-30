import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.main.css";
import "bootstrap/dist/js/bootstrap.bundle/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/global.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);