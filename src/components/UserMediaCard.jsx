import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserMediaCard = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("/api/v1/post/user/" + user?._id);
        setPosts(data.posts);
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
  }, [user?._id]);
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-4">
      <div className=" flex justify-between items-center">
        <span className=" tracking-wide font-medium">User Media</span>

        <Link className=" text-xs text-blue-500" to={"/"}>
          See all
        </Link>
      </div>
      <div className=" flex gap-4  flex-wrap">
        {posts.map((post) => {
          return (
            <img
              key={post?._id}
              src={post?.photo[0]}
              alt=""
              className=" object-cover w-1/5 h-24 rounded-md"
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserMediaCard;
