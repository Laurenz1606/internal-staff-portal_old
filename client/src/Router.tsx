import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setConfig, LoggedInOnly, LoggedOutOnly } from "@authfunctions/react";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

export default function Router(): ReactElement {
  setConfig(
    "https://isp-dev-server.mk-return.de/api",
    "https://isp-dev-server.mk-return.de/auth",
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoggedOutOnly>
              <Login />
            </LoggedOutOnly>
          }
        />
        <Route
          path="/"
          element={
            <LoggedInOnly>
              <Dashboard />
            </LoggedInOnly>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
