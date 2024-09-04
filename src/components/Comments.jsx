import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Comments = ({ post, setComments }) => {
  const currentUser = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const [adding, setAdding] = useState(false);

  const addComment = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const { data } = await axios.post("/api/v1/post/comment/" + post._id, {
        comment,
      });

      setComment("");
      setAdding(false);
      setComments(data.comments);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(error);
      setAdding(false);
      toast.error(message);
    }
  };
  return (
    <div>
      <div className=" flex items-center gap-4">
        <img
          src={
            currentUser?.avatar
              ? currentUser?.avatar
              : "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt=""
          width={32}
          height={32}
          className=" w-8 rounded-full object-cover   h-8"
        />
        <form onSubmit={addComment} className=" flex-1">
          <input
            className=" disabled:opacity-75 bg-gray-100 rounded-xl text-sm px-3 lg:px-6 py-2 lg:py-3 w-full"
            type="text"
            disabled={adding}
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
