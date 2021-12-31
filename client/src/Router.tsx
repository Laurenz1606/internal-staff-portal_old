import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setConfig, LoggedInOnly, LoggedOutOnly } from "@authfunctions/react";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import OneTimePassword from "./Pages/OneTimePassword";

export default function Router(): ReactElement {
  setConfig(
    process.env.REACT_APP_API_URL || "",
    process.env.REACT_APP_AUTH_URL || "",
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/password"
          element={
            <LoggedOutOnly>
              <OneTimePassword />
            </LoggedOutOnly>
          }
        />
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
