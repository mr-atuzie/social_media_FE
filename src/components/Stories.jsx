import React from "react";

const Stories = () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className=" w-full p-4 bg-white rounded-lg  shadow-md overflow-scroll hide-scrollbar  text-xs">
      <div className=" flex gap-8 w-max">
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
                  className="w-16 h-16 object-cover rounded-full ring-2"
                />
              </div>
              <span className="font-medium">Marvin</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
