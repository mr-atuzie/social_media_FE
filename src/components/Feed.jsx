import React, { useEffect } from "react";
import Post from "./Post";
import PostLoader from "./PostLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPostLoader,
  selectPosts,
} from "../redux/features/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postLoader = useSelector(selectPostLoader);
  // const getPosts = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get("/api/v1/post");
  //     setPosts(data.posts);
  //     setLoading(false);
  //     console.log(data);
  //   } catch (error) {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //     setLoading(false);
  //     console.log(error);
  //     console.log(message);
  //   }
  // };

  // getPosts();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postLoader) {
    return <PostLoader />;
  }

  return (
    <div className="p-2 lg:p-4 shadow-md mb-24 bg-white rounded-lg h-screen flex flex-col gap-3 lg:gap-6  lg:overflow-y-scroll lg:customScrollBar">
      {posts?.map((post) => {
        return <Post key={post?._id} post={post} />;
      })}
    </div>
  );
};

export default Feed;
