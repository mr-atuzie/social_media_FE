import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
// import { selectComents } from "../redux/features/postSlice";

const Comments = ({ post }) => {
  const currentUser = useSelector(selectUser);
  const [comment, setComment] = useState("");

  // const comments = useSelector(selectComents);

  // console.log(comments);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/post/comment/" + post._id, {
        comment,
      });

      setComment("");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(error);
      toast.error(message);
    }
  };
  return (
    <div>
      <div className=" flex items-center gap-4">
        <img
          src={currentUser?.avatar}
          alt=""
          width={32}
          height={32}
          className=" w-8 rounded-full object-cover   h-8"
        />
        <form onSubmit={addComment} className=" flex-1">
          <input
            className="  bg-gray-100 rounded-xl text-sm px-6 py-3 w-full"
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Comments;
