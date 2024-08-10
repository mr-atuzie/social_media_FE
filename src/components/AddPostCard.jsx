import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

const AddPostCard = ({ setAddPost }) => {
  const user = useSelector(selectUser);
  return (
    <div className=" w-[90%] mx-auto bg-white min-h-[500px] rounded-md shadow-md p-2 lg:w-[40%]">
      <div className=" flex justify-between items-center">
        <img
          src={
            user?.avatar ? user?.avatar : "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt=""
          className=" w-10 ring-black ring-2 h-10 rounded-full object-cover"
        />

        <button onClick={() => setAddPost(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 font-medium text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddPostCard;
