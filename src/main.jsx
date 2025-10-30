import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CSVDataDashboard from "./CSVDataDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CSVDataDashboard />
  </StrictMode>
);
