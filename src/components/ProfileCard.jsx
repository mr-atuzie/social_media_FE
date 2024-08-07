import React from "react";

const ProfileCard = () => {
  return (
    <div className=" p-4 shadow-md bg-white rounded-lg flex flex-col gap-4">
      <div className=" h-28 relative">
        <img
          src="https://images.pexels.com/photos/27101332/pexels-photo-27101332/free-photo-of-portrait-of-hugging-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className=" h-full w-full rounded-md object-cover"
        />
        <div className=" ">
          <img
            src="https://images.pexels.com/photos/14116149/pexels-photo-14116149.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className=" w-12 h-12  absolute left-0 right-0 m-auto -bottom-6 rounded-full object-cover ring-2 ring-white z-20"
          />
        </div>
      </div>

      <div className=" flex items-center flex-col  mt-5">
        <div className=" font-semibold text-center">Atuzie Rex</div>
        <div className=" flex items-center justify-center text-xs text-gray-500  gap-2">
          <span>
            <span className=" text-black font-semibold">2900</span> Followoing
          </span>
          <span>
            <span className=" text-black font-semibold">750</span> Followers
          </span>
        </div>
        <button className=" text-sm  mt-2 rounded-md text-white px-4 py-2 bg-black ">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
