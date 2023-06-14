export const cohortName = "2301-FTB-ET-WEB-FT";
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const registerUser = async (userObj) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: userObj.name,
          password: userObj.password,
        },
      }),
    });
    const result = await response.json();
    // You can log ▲▲▲ the result
    // here ▼▼▼ to view the json object before returning it

    return result.data.token;
  } catch (err) {
    console.log(err);
  }
};

const login = async (userObj) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: userObj.name,
          password: userObj.password,
        },
      }),
    });
    const result = await response.json();
    if (!result.success) {
      throw Error(result.error.message);
    }
    return result.data.token;
  } catch (err) {
    throw err;
  }
};

const myData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);

    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const makePost = async (token, postObj) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: postObj.title,
          description: postObj.description,
          price: postObj.price,
          location: postObj.location,
          willDeliver: postObj.willDeliver,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const updatePost = async (token, postId, newPostObj) => {
  try {
    // You will need to insert a variable into the fetch template literal
    // in order to make the POST_ID dynamic.
    // 5e8d1bd48829fb0017d2233b is just for demonstration.
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: newPostObj.title,
          description: newPostObj.description,
          price: newPostObj.price,
          location: newPostObj.location,
          willDeliver: newPostObj.willDeliver,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};

const deletePost = async (postId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const postMessage = async (postId, token, messageObj) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: messageObj.body,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export default registerUser;
export {
  myData,
  fetchPosts,
  login,
  makePost,
  updatePost,
  deletePost,
  postMessage,
};
