import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Box } from "../../components/Box/Box";
//import { Layout } from "../../components/Layout/Layout";
import { Seperator } from "../../components/Seperator/Seperator";
import classes from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";
export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useAuthentication();
  if (!authContext) {
    throw new Error("Authentication context is not available");
  }
  const { login } = authContext;
  const navigate = useNavigate();
  const location = useLocation();
  const doLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    // console.log(email, password);
    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={classes.root}>
      <Box>
        <h1>Sign In</h1>
        <p>Make Your Own Blog And Connect Others</p>
        <form onSubmit={doLogin}>
          <Input type="email" id="email" label="Email" />
          <Input
            type="password"
            id="password"
            label="Password"
            onFocus={() => setErrorMessage("")}
          />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
          <Link to="/authentication/request-password-reset">
            Forgot password?
          </Link>
        </form>
        <Seperator>Or</Seperator>
        <div className={classes.register}>
          {" "}
          New on Postinger? <Link to="/authentication/signup">Sign Up</Link>
        </div>
      </Box>
    </div>
  );
}
