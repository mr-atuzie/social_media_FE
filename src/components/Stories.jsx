import React from "react";

const Stories = () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className=" w-full p-4 flex flex-col gap-4 overflow-hidden bg-white rounded-lg  shadow-md   text-xs">
      <div>
        <h1 className=" font-medium">Status</h1>
        <p className=" text-xs text-gray-400">
          status disappear after 24 hours
        </p>
      </div>
      <div className=" flex gap-4 py-1 md:gap-6 overflow-scroll hide-scrollbar  w-full">
        <div className=" flex flex-col items-center gap-2 cursor-pointer ">
          <div className="relative  w-14 h-14 ring-black lg:w-16 lg:h-16 ">
            <img
              src={"https://i.ibb.co/4pDNDk1/avatar.png"}
              alt=""
              className=" object-cover rounded-full ring-2"
            />

            <div className=" w-8 h-8 flex justify-center items-center bg-black rounded-full absolute text-white -bottom-2 -right-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 font-medium"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
          <span className=" text-xs md:text-sm text-gray-500">Add status</span>
        </div>
        {stories.map((story) => {
          return (
            <div
              key={story}
              className=" flex flex-col items-center gap-2 cursor-pointer "
            >
              <div className=" ">
                <img
                  src={
                    "https://images.pexels.com/photos/22873531/pexels-photo-22873531/free-photo-of-surfers-going-into-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  }
                  alt=""
                  className=" w-14 h-14 ring-black lg:w-16 lg:h-16 object-cover rounded-full ring-2"
                />
              </div>
              <span className=" text-xs md:text-sm">Marvin</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
