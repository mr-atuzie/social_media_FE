import React, { useState } from "react";
import AddPostCard from "./AddPostCard";

const AddPost = () => {
  const [addpost, setAddPost] = useState(false);
  return (
    <>
      <button
        onClick={() => setAddPost(true)}
        className=" w-16 h-16 flex justify-center items-center fixed bottom-[15%] right-[10%] lg:right-[15%] z-40  rounded-full shadow-md bg-black text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 font-medium"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      {addpost && (
        <div className=" fixed inset-0 z-50 w-full h-screen hide-scrollbar overflow-hidden flex justify-center items-center  bg-black/50">
          <AddPostCard setAddPost={setAddPost} />
        </div>
      )}
    </>
  );
};

export default AddPost;
