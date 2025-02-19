import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
//import { usePageTitle } from "../../../../hooks/usePageTitle";
import { Box } from "../../components/Box/Box";
import classes from "./VerifyEmail.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { request } from "../../../../utils/api";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";

export function VerifyEmail() {
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useAuthentication();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //usePageTitle("Verify Email");
  const navigate = useNavigate();

  const validateEmail = async (code: string) => {
    setMessage("");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/authentication/validate-email-verification-token?token=${code}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setErrorMessage("");
        navigate("/");
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailVerificationToken = async () => {
    setErrorMessage("");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/authentication/send-email-verification-token`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setErrorMessage("");
        setMessage("Verification code sent successfully");
        return;
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Box>
        <h1>Verify your Email</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const code = e.currentTarget.code.value;
            await validateEmail(code);
            setIsLoading(false);
          }}
        >
          <p>
            Only one step left to complete your registration. Verify your email
            address.
          </p>
          <Input type="text" label="Verification code" key="code" name="code" />
          {message ? <p style={{ color: "green" }}>{message}</p> : null}
          {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Validate email"}
          </Button>
          <Button
            outline
            type="button"
            onClick={() => {
              sendEmailVerificationToken();
            }}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Send again"}
          </Button>
        </form>
      </Box>
    </div>
  );
}
