import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { InfoProvider } from "./context/InfoContext";
import { FiltroProvider } from "./context/FiltrosContext";

import { TicketsContextProvider } from "./context/TicketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TicketsContextProvider>
        <InfoProvider>
          <FiltroProvider>
            <App />
          </FiltroProvider>
        </InfoProvider>
      </TicketsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
