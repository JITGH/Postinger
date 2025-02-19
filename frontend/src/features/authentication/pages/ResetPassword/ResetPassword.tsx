import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Box } from "../../components/Box/Box";
//import { Layout } from "../../components/AuthenticationLayout/Layout";
import classes from "./ResetPassword.module.scss";
import { useState } from "react";

export function ResetPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Box>
        <h1>Reset Password</h1>
        {!emailSent ? (
          <form action="">
            <p>
              Enter your email and we’ll send a verification code if it matches
              an existing LinkedIn account.
            </p>
            <Input key="email" name="email" type="email" label="Email" />
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Button type="submit">Next</Button>
            <Button
              type="button"
              outline
              onClick={() => navigate("/authentication/login")}
            >
              Back
            </Button>
          </form>
        ) : (
          <form action="">
            <p>
              Enter the verification code we sent to your email and your new
              password.
            </p>
            <Input
              type="text"
              label="Verification code"
              key="code"
              name="code"
            />
            <Input
              label="New password"
              name="password"
              key="password"
              type="password"
              id="password"
            />
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Button type="submit">Reset password</Button>
            <Button type="button" outline onClick={() => setEmailSent(false)}>
              Back
            </Button>
          </form>
        )}
      </Box>
    </div>
  );
}
