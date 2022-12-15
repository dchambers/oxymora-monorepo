import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // TODO: Most / all of this CSS should live with the component

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
