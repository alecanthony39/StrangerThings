import React from "react";
import { useEffect, useState } from "react";
import { myData } from "../Api";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData.data);
    };
    fetchUser();
  }, []);
  console.log(user);

  if (!token) {
    return <h1>You Are Not Logged In!</h1>;
  }

  return (
    <Container>
      <h1>Welcome {user && user.username}</h1>

      <h3>My Posts</h3>
      <Row>
        {user &&
          user.posts.map((post) => {
            return (
              <Col md={4} key={post._id}>
                <Card style={{ marginBottom: "10px" }}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {post.price}
                    </Card.Subtitle>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text>
                      <strong>Location: </strong>
                      {post.location}
                    </Card.Text>
                    <Card.Text>
                      <strong>Will Deliver: </strong>
                      {post.willDeliver}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Home;
