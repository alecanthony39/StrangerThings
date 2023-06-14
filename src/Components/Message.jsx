import React from "react";
import { useState } from "react";
import { postMessage } from "../Api";
import { Form, Button } from "react-bootstrap";

const PostMessage = ({ post, token, setMessage }) => {
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messageObj = {
      body: body,
    };

    await postMessage(post._id, token, messageObj);
    setMessage(false);
    setBody("");
  };

  return (
    <div>
      <h1>Compose Message</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBody">
          <Form.Control
            placeholder="Body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Message
        </Button>
        <Button
          variant="danger"
          onClick={(event) => {
            setMessage(false);
          }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default PostMessage;
