import React from "react";
import { useState } from "react";
import Edit from "./Edit";
import { deletePost, fetchPosts } from "../Api";
import PostMessage from "./Message";
import { Card, Button } from "react-bootstrap";

const SinglePosts = ({ post, user, token, setPosts }) => {
  const [postId, setPostId] = useState(null);
  const [message, setMessage] = useState(false);

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {post.author.username}
        </Card.Subtitle>
        <Card.Text>{post.description}</Card.Text>
        <Card.Text>Price: {post.price}</Card.Text>
        <Card.Text>Location: {post.location}</Card.Text>
        <Card.Text>Will deliver: {post.willDeliver ? "Yes" : "No"}</Card.Text>
        {post.author._id === user._id && (
          <Button
            variant="primary"
            onClick={() => {
              setPostId(post._id);
            }}
          >
            Edit
          </Button>
        )}

        {postId && (
          <div>
            <Edit
              post={post}
              token={token}
              setPosts={setPosts}
              setPostId={setPostId}
            />
          </div>
        )}
        {post.author._id !== user._id && (
          <Button
            variant="primary"
            onClick={(event) => {
              setMessage(true);
            }}
          >
            Message
          </Button>
        )}

        {message && (
          <PostMessage token={token} post={post} setMessage={setMessage} />
        )}

        {post.author._id === user._id && (
          <Button
            variant="danger"
            onClick={async (event) => {
              await deletePost(post._id, token);
              const nextPosts = await fetchPosts();

              setPosts(nextPosts.data.posts.reverse());
            }}
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SinglePosts;
