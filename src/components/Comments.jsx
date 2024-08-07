import React from "react";

const Comments = () => {
  return (
    <div>
      <div className=" flex items-center gap-4">
        <img
          src={
            "https://images.pexels.com/photos/27101332/pexels-photo-27101332/free-photo-of-portrait-of-hugging-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
          width={32}
          height={32}
          className=" w-8 rounded-full object-cover   h-8"
        />
        <div className=" flex-1">
          <input
            className="  bg-gray-100 rounded-xl text-sm px-6 py-3 w-full"
            type="text"
            placeholder="Write a comment..."
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
