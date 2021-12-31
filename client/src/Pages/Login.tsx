import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@authfunctions/react";
import { Link } from "react-router-dom";
import Divider from "../Components/Divider";
import Input from "../Components/Input";
import FormPage from "../Layouts/FormPage";

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
    <FormPage heading="Anmelden">
      <>
        <div>
          <Input
            id="login"
            setValue={setLogin}
            title="Email oder Benutzername"
            value={login}
            label
            placeHolder
            required
            type="text"
          />
        </div>
        <div>
          <Input
            id="password"
            setValue={setPassword}
            title="Passwort"
            value={password}
            label
            placeHolder
            required
            type="password"
          />
        </div>
        <div>
          <button
            onClick={onLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Anmelden
          </button>
        </div>
        <div>
          <Divider>Oder</Divider>
          <div className="mt-4">
            <Link
              to="/password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>
      </>
    </FormPage>
  );
}
