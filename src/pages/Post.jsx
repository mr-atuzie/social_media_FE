import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get("/api/v1/post/" + id);
        setPost(data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(message);
        toast.error(message);
      }
    };
    getPost();
  }, [id]);

  console.log(post);

  return <div>Post</div>;
};

export default Post;
