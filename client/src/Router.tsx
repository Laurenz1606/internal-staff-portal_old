import React, { ReactElement, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { setConfig, LoggedInOnly, LoggedOutOnly } from "@authfunctions/react";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import OneTimePassword from "./Pages/OneTimePassword";
import SidebarLayout from "./Layouts/SidebarLayout";
import Mails from "./Pages/Mails";
import Provision from "./Pages/Provision";
import Tasks from "./Pages/Tasks";
import Calendar from "./Pages/Calendar";
import Documents from "./Pages/Documents";
import AltIT from "./Pages/AltIT";
import Sammelwettbewerb from "./Pages/Sammelwettbewerb";
import Settings from "./Pages/Settings";

export default function Router(): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCurrent, setSidebarCurrent] = useState("");
  const [search, setSearch] = useState("");

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
              <SidebarLayout
                search={search}
                setSearch={setSearch}
                sidebarCurrent={sidebarCurrent}
                setSidebarCurrent={setSidebarCurrent}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              >
                <Outlet />
              </SidebarLayout>
            </LoggedInOnly>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/provision" element={<Provision />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/alt-it" element={<AltIT />} />
          <Route path="/sammelwettbewerb" element={<Sammelwettbewerb />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
