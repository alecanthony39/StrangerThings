import React from "react";
import { updatePost, fetchPosts } from "../Api";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Edit = ({ setPosts, token, post, postId, setPostId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const NewPostobj = {
      title: title ? title : post.title,
      description: description ? description : post.description,
      price: price ? price : post.price,
      location: location ? location : post.location,
      willDeliver: false,
    };
    await updatePost(token, post._id, NewPostobj);
    const nextPosts = await fetchPosts();

    setPosts(nextPosts.data.posts.reverse());
    setPostId(null);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={post.title}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={post.description}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={post.price}
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder={post.location}
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={(event) => {
            setPostId("");
          }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
