import { useLogin } from "@authfunctions/react";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Native/Button";
import Card from "../Components/Native/Card";
import Divider from "../Components/Native/Divider";
import Input from "../Components/Native/Input";
import FormLayout from "../Layouts/FormLayout";
import StyledLink from "../Components/Native/StyledLink";

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const loginFunction = useLogin(navigate);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [statusCode, setStatusCode] = useState(-1);

  async function onLogin() {
    const [err, code, navigator] = await loginFunction(login, password);
    setStatusCode(code);
    if (!err) navigator();
  }

  interface Errors {
    [key: number]: string;
  }

  const errors: Errors = {
    5: "Es gab einen Fehler mit dem Server!",
    21: "Der Benutername/Die Email oder das Passwort fehlt!",
    22: "Der eingegebene Benutzer existiert nicht!",
    23: "Das eingegebene Passwort ist falsch!",
  };

  return (
    <FormLayout heading="Anmelden!">
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
              mode={[5, 21, 22].includes(statusCode) ? "danger" : "default"}
              info={[5, 21, 22].includes(statusCode) ? errors[statusCode] : ""}
            />
            <Input
              id="password"
              setValue={setPassword}
              value={password}
              label="Passwort"
              placeHolder="Passwort"
              type="password"
              mode={[5, 21, 23].includes(statusCode) ? "danger" : "default"}
              info={[5, 21, 23].includes(statusCode) ? errors[statusCode] : ""}
            />
            <Button text="Anmelden" stretch onClick={onLogin} />
            <Divider text="Oder" />
            <div>
              <StyledLink to="/password">Passwort vergessen?</StyledLink>
            </div>
          </div>
        </Card.Body>
      </Card>
    </FormLayout>
  );
}
