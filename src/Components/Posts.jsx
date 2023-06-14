import React from "react";
import SinglePosts from "./SinglePost";
const Posts = ({
  setPosts,
  token,
  posts,
  search,
  title,
  price,
  location,
  description,
  setTitle,
  setLocation,
  setDescription,
  setPrice,
  user,
}) => {
  return (
    <div>
      {posts
        .filter((post) => {
          return search === "" ? post : post.title.includes(search);
        })
        .map((post) => {
          return (
            <SinglePosts
              key={post._id}
              post={post}
              search={search}
              title={title}
              price={price}
              description={description}
              location={location}
              setDescription={setDescription}
              setLocation={setLocation}
              setPrice={setPrice}
              setTitle={setTitle}
              token={token}
              setPosts={setPosts}
              user={user}
            />
          );
        })}
    </div>
  );
};

export default Posts;
