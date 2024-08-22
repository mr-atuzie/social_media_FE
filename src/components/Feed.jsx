import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import PostLoader from "./PostLoader";

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const getPosts = async () => {
        try {
          const { data } = await axios.get("/api/v1/post/user/" + userId);
          setPosts(data.posts);
          console.log(data);
          setLoading(false);
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          console.log(error);
          console.log(message);
        }
      };

      getPosts();
    } else {
      const getPosts = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get("/api/v1/post");
          setPosts(data.posts);
          setLoading(false);
          console.log(data);
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          console.log(error);
          console.log(message);
        }
      };

      getPosts();
    }
  }, [userId]);

  if (loading) {
    return <PostLoader />;
  }

  return (
    <div className=" p-4 shadow-md bg-white rounded-lg flex flex-col gap-3 lg:gap-6">
      {posts?.map((post) => {
        return <Post key={post?._id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
