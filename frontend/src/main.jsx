import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutContextProvider } from "./context/workoutContext";
import { AuthContextProvider } from "./context/authContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
