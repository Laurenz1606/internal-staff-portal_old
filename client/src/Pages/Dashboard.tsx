import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@authfunctions/react";

export default function Dashboard(): ReactElement {
  //use the useLogout hook with react router dom
  const navigate = useNavigate();
  const logoutFunction = useLogout(navigate);

  async function onLogout() {
    //call the login function
    const [,, navigator] = await logoutFunction();

    //navigate to the new url
    return navigator();
  }

  return (
    <div>
      <button onClick={onLogout}>Logout!</button>
    </div>
  );
}