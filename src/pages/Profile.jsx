import React, { useEffect, useState } from "react";
import LeftMenu from "../components/LeftMenu";
import Feed from "../components/Feed";
import RightMenu from "../components/RightMenu";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/" + id);
        console.log(data);

        setUser(data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(error);
        console.log(message);
      }
    };

    getPosts();
  }, [id]);
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
                className=" h-full w-full bg-gray-400 rounded-md object-cover"
              />
              <div className=" ">
                <img
                  src={user?.avatar}
                  alt=""
                  className="w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 bg-gray-400 rounded-full object-cover ring-4 ring-white z-20"
                />
              </div>
            </div>
            <h1 className=" mt-20  font-medium text-2xl">{user?.username}</h1>
            <p className=" mb-4 text-xs lg:text-sm text-gray-500">
              {user?.name}
            </p>
            <div className=" flex items-center justify-center text-sm    gap-12 mb-4">
              <div className=" flex flex-col items-center">
                <h2 className=" text-black font-semibold">290</h2>
                <p className=" ">Posts</p>
              </div>
              <div className=" flex flex-col  items-center">
                <h2 className=" text-black font-semibold">
                  100
                  {/* {user?.followers.length} */}
                </h2>
                <p className=" ">Followers</p>
              </div>
              <div className=" flex flex-col items-center">
                <h2 className=" text-black font-semibold">
                  345
                  {/* {user?.followings.length} */}
                </h2>
                <p className=" ">Followings</p>
              </div>
            </div>
          </div>
          <Feed userId={user?._id} />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu userId={user?._id} />
      </div>
    </div>
  );
};

export default Profile;
