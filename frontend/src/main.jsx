import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutContextProvider } from "./context/workoutContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </React.StrictMode>
);
