import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Message from "./Components/Messages";
import { Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./Components/Profile";
import { fetchPosts } from "./Api";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const App = () => {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const GetAllPosts = async () => {
      const NewPosts = await fetchPosts();
      setPosts(NewPosts.data.posts.reverse());
    };
    GetAllPosts();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Profile">
            <h1 className="bookface-header">BookFace</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!token && (
                <>
                  <Nav.Link as={Link} to="/Login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/SignUp">
                    SignUp
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/Profile">
                Profile
              </Nav.Link>
              {token && (
                <>
                  <Nav.Link as={Link} to="/Home">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Messages">
                    Messages
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/Home" element={<Home token={token} />} />
        <Route path="/Messages" element={<Message token={token} />} />
        <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
        <Route
          path="/Profile"
          element={
            <Profile
              posts={posts}
              setPosts={setPosts}
              setToken={setToken}
              token={token}
            />
          }
        />
        <Route path="/Login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
