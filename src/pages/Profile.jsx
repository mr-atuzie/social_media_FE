import React from "react";
import LeftMenu from "../components/LeftMenu";
import Feed from "../components/Feed";
import RightMenu from "../components/RightMenu";

const Profile = () => {
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%]">
        <div className=" flex-col gap-6 flex">
          <div className=" flex flex-col items-center justify-center">
            <div className=" h-64 w-full relative">
              <img
                src="https://images.pexels.com/photos/24460824/pexels-photo-24460824/free-photo-of-esb-among-lower-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                className=" h-full w-full rounded-md object-cover"
              />
              <div className=" ">
                <img
                  src="https://images.pexels.com/photos/24712934/pexels-photo-24712934/free-photo-of-woman-sitting-in-suit-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  className="w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 rounded-full object-cover ring-4 ring-white z-20"
                />
              </div>
            </div>
            <h1 className=" mt-20 mb-4 font-medium text-2xl">Clark kent</h1>
            <div className=" flex items-center justify-center text-sm    gap-12 mb-4">
              <div className=" flex flex-col items-center">
                <h2 className=" text-black font-semibold">290</h2>
                <p className=" ">Posts</p>
              </div>
              <div className=" flex flex-col  items-center">
                <h2 className=" text-black font-semibold">1885</h2>
                <p className=" ">Followers</p>
              </div>
              <div className=" flex flex-col items-center">
                <h2 className=" text-black font-semibold">1.4K</h2>
                <p className=" ">Followings</p>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu userId={"text"} />
      </div>
    </div>
  );
};

export default Profile;
