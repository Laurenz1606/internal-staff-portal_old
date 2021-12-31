import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@authfunctions/react";

export default function Login(): ReactElement {
  //use the useLogin hook with react router dom
  const navigate = useNavigate();
  const loginFunction = useLogin(navigate);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onLogin() {
    //reset the error
    setError("");

    //call the login function
    const [err, code, navigator] = await loginFunction(login, password);

    //check for errors
    if (err) {
      return setError(code.toString());
    }

    //navigate to the new url
    return navigator();
  }

  return (
    <div>
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="username or email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={onLogin}>Login!</button>
      {error ? <p>Error Code: {error}</p> : ""}
    </div>
  );
}
