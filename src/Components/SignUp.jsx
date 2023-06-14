import React from "react";
import { useState } from "react";
import registerUser from "../Api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SignUp = ({ setToken }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleUserResgier = async (event) => {
    event.preventDefault();
    try {
      const NewUser = {
        name: userName,
        password: password,
      };
      const usertoken = await registerUser(NewUser);
      setToken(usertoken);
      navigate("/Profile");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          value={userName}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Username"
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        ></Form.Control>
      </Form.Group>
      <Button onClick={handleUserResgier}>Submit</Button>

      <div>{errorMessage}</div>
    </form>
  );
};

export default SignUp;
