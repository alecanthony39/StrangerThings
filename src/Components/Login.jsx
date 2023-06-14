import React from "react";
import { useState } from "react";
import { login } from "../Api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUserResgier = async (event) => {
    event.preventDefault();
    try {
      const NewUser = {
        name: username,
        password: password,
      };
      const usertoken = await login(NewUser);
      setToken(usertoken);
      navigate("/Profile");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FormControl
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          placeholder="Username"
        ></FormControl>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FormControl
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        ></FormControl>
      </Form.Group>
      <Button onClick={handleUserResgier}>Login</Button>
      <div>{errorMessage}</div>
    </form>
  );
};

export default Login;
