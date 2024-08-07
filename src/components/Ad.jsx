import React from "react";

const Ad = () => {
  return (
    <div className="p-4 shadow-md bg-white rounded-lg">
      <div className=" flex justify-between items-center">
        <span className=" tracking-wide font-medium">Sponsored Ads</span>

        <span className=" text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </span>
      </div>

      <div className=" flex flex-col gap-4 mt-4 text-sm ">
        <div>
          <img
            src={
              "https://images.pexels.com/photos/22873531/pexels-photo-22873531/free-photo-of-surfers-going-into-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" w-full h-36 rounded-lg object-cover"
          />
        </div>
        <div className=" items-center flex gap-2">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/22873531/pexels-photo-22873531/free-photo-of-surfers-going-into-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-8 h-6 rounded-lg object-cover"
            />
          </div>
          <span className=" font-medium text-blue-500">Landmark Beach</span>
        </div>
        <p className=" text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          numquam distinctio inventore enim!
        </p>
        <button className=" p-2 bg-gray-200 text-sm rounded-lg text-gray-500">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
