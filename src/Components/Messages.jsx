import React from "react";
import { useState, useEffect } from "react";
import { myData } from "../Api";
import { Container, Row, Col, Card } from "react-bootstrap";

const Message = ({ token }) => {
  const [user, setUser] = useState(null);
  const [sentMessage, setSentMessage] = useState([]);
  const [recievedMessage, setRecievedMessage] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData.data);
      setRecievedMessage(
        userData.data.messages.filter((message) => {
          return message.fromUser._id !== userData.data._id;
        })
      );
      setSentMessage(
        userData.data.messages.filter((message) => {
          return message.fromUser._id === userData.data._id;
        })
      );
    };
    fetchUser();
  }, []);

  if (!token || !user) {
    return <h1>You Are Not Logged In!</h1>;
  }

  return (
    <Container>
      <h1>{user.username}'s Inbox</h1>
      <Row>
        <Col>
          <h2>Received Messages</h2>
          {recievedMessage.length < 1 ? (
            <p>You Have No Messages</p>
          ) : (
            recievedMessage.map((message) => {
              return (
                <Card key={message._id} className="mb-3">
                  <Card.Header>From: {message.fromUser.username}</Card.Header>
                  <Card.Body>
                    <Card.Text>{message.content}</Card.Text>
                  </Card.Body>
                  <Card.Footer>Original Post: {message.post.title}</Card.Footer>
                </Card>
              );
            })
          )}
        </Col>
        <Col>
          <h2>Sent Messages</h2>
          {sentMessage.length < 1 ? (
            <p>You Have Sent No Messages</p>
          ) : (
            sentMessage.map((message) => {
              console.log(sentMessage);
              return (
                <Card key={message._id} className="mb-3">
                  <Card.Header>To: {message.post.author.username}</Card.Header>
                  <Card.Body>
                    <Card.Text>{message.content}</Card.Text>
                  </Card.Body>
                  <Card.Footer>Original Post: {message.post.title}</Card.Footer>
                </Card>
              );
            })
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Message;
