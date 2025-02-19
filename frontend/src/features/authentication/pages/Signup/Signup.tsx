import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Box } from "../../components/Box/Box";
//import { Layout } from "../../components/AuthenticationLayout/Layout";
import { Seperator } from "../../components/Seperator/Seperator";
import classes from "./Signup.module.scss";
import { FormEvent, useState } from "react";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";
export function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useAuthentication();
  if (!authContext) {
    throw new Error("Authentication context is not available");
  }
  const { signup } = authContext;
  const navigate = useNavigate();
  const doSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      await signup(email, password);
      navigate("/");
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
        <h1>Sign Up</h1>
        <p>Make Your Own Blog And Connect Others</p>
        <form onSubmit={doSignup}>
          <Input type="email" id="email" label="Email" />
          <Input
            type="password"
            id="password"
            label="Password"
            onFocus={() => setErrorMessage("")}
          />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <p className={classes.disclaimer}>
            By clicking Agree & Join or Continue, you agree to Postinger's{" "}
            <a href="">User Agreement</a>, <a href="">Privacy Policy</a>, and{" "}
            <a href="">Cookie Policy</a>.
          </p>
          <Button type="submit" disabled={isLoading}>
            Agree & Join
          </Button>
        </form>
        <Seperator>Or</Seperator>
        <div className={classes.register}>
          {" "}
          Already on Postinger? <Link to="/authentication/login">Sign in</Link>
        </div>
      </Box>
    </div>
  );
}
