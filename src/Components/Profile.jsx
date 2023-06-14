import React from "react";
import { makePost, myData, fetchPosts } from "../Api";
import { useEffect, useState } from "react";
import Posts from "./Posts";
import { Button, Form } from "react-bootstrap";

const Profile = ({ token, setToken, posts, setPosts }) => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [createPost, setCreatePost] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData.data);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postObj = {
      title: title,
      description: description,
      price: price,
      location: location,
      willDeliver: false,
    };
    await makePost(token, postObj);
    const nextPost = await fetchPosts();
    const nextPostR = nextPost.data.posts.reverse();

    setPosts(nextPostR);

    setTitle("");
    setDescription("");
    setPrice("");
    setCreatePost(false);
  };

  if (!token) {
    return <h1>You Are Not Logged In!</h1>;
  }

  return (
    <>
      <h1>
        Welcome {user.username}
        <span>
          -
          <Button
            onClick={(event) => {
              setToken(null);
            }}
          >
            Log Out
          </Button>
        </span>
      </h1>

      <div>
        <Button
          onClick={(event) => {
            setCreatePost(true);
          }}
        >
          Make Post
        </Button>
        {createPost && (
          <>
            <p>Create Post</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="location"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Post
              </Button>
              <Button
                variant="secondary"
                onClick={(event) => {
                  setCreatePost(false);
                }}
              >
                Cancel
              </Button>
            </Form>
          </>
        )}
      </div>
      <div>
        <h3>Search</h3>
        <Form.Control
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <Posts
        posts={posts}
        token={token}
        setPosts={setPosts}
        search={search}
        title={title}
        price={price}
        description={description}
        location={location}
        setDescription={setDescription}
        setLocation={setLocation}
        setPrice={setPrice}
        setTitle={setTitle}
        user={user}
      />
    </>
  );
};

export default Profile;
