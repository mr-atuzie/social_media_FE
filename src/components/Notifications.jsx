import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="px-4 pb-4 h-80 shadow-md bg-white rounded-lg flex overflow-y-scroll customScrollBar flex-col gap-4">
      <div className=" flex pt-4 bg-white z-40 justify-between sticky top-0 items-center">
        <span className="  font-medium tracking-wide">Notifications</span>

        <Link className=" text-xs text-blue-500" to={"/"}>
          See all
        </Link>
      </div>

      <div className=" flex gap-2 bg-gray-50 rounded-lg p-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-red-500"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>

        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/5232625/pexels-photo-5232625.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-8 object-cover  rounded-full"
            />
          </div>

          <p className="text-sm">
            <span className=" font-medium">Micheal Faraday</span> liked your
            post
          </p>
        </div>
      </div>

      <div className=" flex gap-2 bg-gray-50 rounded-lg p-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/27269578/pexels-photo-27269578/free-photo-of-marti.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-8 object-cover  rounded-full"
            />
          </div>

          <p className="text-sm">
            <span className=" font-medium">Rex Atuzie</span> commented on your
            post
          </p>
        </div>
      </div>
      <div className=" flex gap-2 bg-gray-50 rounded-lg p-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-slate-500"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/27241173/pexels-photo-27241173.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-8 object-cover  rounded-full"
            />
          </div>

          <p className="text-sm ">
            <span className=" font-medium text-black">Lucious Lyon</span>{" "}
            followed you
          </p>
        </div>
      </div>
      <div className=" flex gap-2 bg-gray-50 rounded-lg p-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-red-500"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>

        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/5232625/pexels-photo-5232625.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-8 object-cover  rounded-full"
            />
          </div>

          <p className="text-sm">
            <span className=" font-medium">Micheal Faraday</span> liked your
            post
          </p>
        </div>
      </div>

      <div className=" flex gap-2 bg-gray-50 rounded-lg p-2 items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/27269578/pexels-photo-27269578/free-photo-of-marti.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-8 object-cover  rounded-full"
            />
          </div>

          <p className="text-sm">
            <span className=" font-medium">Rex Atuzie</span> commented on your
            post
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
