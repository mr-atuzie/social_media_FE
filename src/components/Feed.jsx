import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      const getPosts = async () => {
        try {
          const { data } = await axios.get("/api/v1/post/user/" + userId);
          setPosts(data.posts);
          console.log(data);
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(error);
          console.log(message);
        }
      };

      getPosts();
    } else {
      const getPosts = async () => {
        try {
          const { data } = await axios.get("/api/v1/post");
          setPosts(data.posts);
          console.log(data);
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(error);
          console.log(message);
        }
      };

      getPosts();
    }
  }, [userId]);

  return (
    <div className=" p-4 shadow-md bg-white rounded-lg flex flex-col gap-3 lg:gap-6">
      {posts?.map((post) => {
        return <Post key={post?._id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
