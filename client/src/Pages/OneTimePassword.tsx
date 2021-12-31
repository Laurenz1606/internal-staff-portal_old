import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOneTime } from "@authfunctions/react";
import FormPage from "../Layouts/FormPage";
import Input from "../Components/Input";
import Divider from "../Components/Divider";
import { Link } from "react-router-dom";

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
    <FormPage heading="Einmalpasswort">
      <>
        <p>
          Gebe hier deine Email oder dein Benutzernamen ein, du bekommst dann
          per Email ein Passwort was du einmalig nehmen kannst um dich
          anzumelden!
        </p>
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
          <button
            onClick={onGetOneTime}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Einmalpasswort generieren!
          </button>
        </div>
        <div>
          <Divider>Oder</Divider>
          <div className="mt-4">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Zurück zum Login!
            </Link>
          </div>
        </div>
      </>
    </FormPage>
  );
}
