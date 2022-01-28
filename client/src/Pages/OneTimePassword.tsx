import { useGetOneTime } from "@authfunctions/react";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Native/Button";
import Card from "../Components/Native/Card";
import Divider from "../Components/Native/Divider";
import Input from "../Components/Native/Input";
import StyledLink from "../Components/Native/StyledLink";
import FormLayout from "../Layouts/FormLayout";

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const getOneTimeFunction = useGetOneTime(navigate);
  const [login, setLogin] = useState("");
  const [statusCode, setStatusCode] = useState(-1);

  async function onGetOneTime() {
    const [err, code, navigator] = await getOneTimeFunction(login);
    setStatusCode(code);
    if (!err) navigator();
  }

  interface Errors {
    [key: number]: string;
  }

  const errors: Errors = {
    5: "Es gab einen Fehler mit dem Server!",
    61: "Das Benutername/Die Email fehlt!",
    62: "Der eingegebene Benutzer existiert nicht!",
  };

  return (
    <FormLayout heading="Passwort vergessen!">
      <Card>
        <Card.Body>
          <div className="space-y-6">
            <Input
              id="login"
              setValue={setLogin}
              value={login}
              label="Email oder Benutzername"
              placeHolder="Email oder Benutzername"
              type="text"
              mode={[5, 61, 62].includes(statusCode) ? "danger" : "default"}
              info={
                [5, 61, 62].includes(statusCode)
                  ? errors[statusCode]
                  : "Du erhälst ein Einmalpasswort per Email, gebe dies anstatt deines normalen Passworts ein!"
              }
            />
            <Button
              text="Einmalpasswort generieren"
              stretch
              onClick={onGetOneTime}
            />
            <Divider text="Oder" />
            <div>
              <StyledLink to="/login">Zum Anmelden!</StyledLink>
            </div>
          </div>
        </Card.Body>
      </Card>
    </FormLayout>
  );
}
