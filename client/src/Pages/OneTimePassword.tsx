import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOneTime } from "@authfunctions/react";

export default function OneTimePassword(): ReactElement {
  //use the useLogin hook with react router dom
  const navigate = useNavigate();
  const getOneTimeFunction = useGetOneTime(navigate);
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  async function onGetOneTime() {
    //reset the error
    setError("");

    //call the login function
    const [err, code, navigator] = await getOneTimeFunction(login);

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
      <button onClick={onGetOneTime}>Get One Time Password!</button>
      {error ? <p>Error Code: {error}</p> : ""}
    </div>
  );
}
