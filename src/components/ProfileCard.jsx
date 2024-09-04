import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/user/" + currentUser._id);

        setLoading(false);
        setUser(response.data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(message);
      }
    };

    fetchUserPosts();
  }, [currentUser._id]);

  return (
    <div className=" p-2.5 shadow-md bg-white rounded-lg flex flex-col gap-4">
      {loading ? (
        <>
          <div className=" h-28 relative">
            <div className=" bg-gray-100 h-full w-full rounded-md object-cover"></div>
            <div className=" ">
              <div className=" w-12 h-12 bg-gray-100  absolute left-0 right-0 m-auto -bottom-6 rounded-full object-cover ring-2 ring-white z-20"></div>
            </div>
          </div>

          <div className=" flex items-center flex-col  mt-5">
            <div className=" font-semibold text-center w-[50%] bg-gray-100 p-2"></div>
            <div className=" flex items-center my-2 justify-center w-[80%] text-xs bg-gray-100 p-2 text-gray-500  gap-2"></div>
            <button className=" text-sm   rounded-md text-white p-4 bg-gray-100 w-32 "></button>
          </div>
        </>
      ) : (
        <>
          <div className=" h-28 relative">
            <img
              src={user?.coverPic}
              alt=""
              className=" h-full w-full rounded-md object-cover"
            />
            <div className=" ">
              <img
                src={user?.avatar}
                alt=""
                className=" w-12 h-12  absolute left-0 right-0 m-auto -bottom-6 rounded-full object-cover ring-2 ring-white z-20"
              />
            </div>
          </div>

          <div className=" flex items-center flex-col  mt-5">
            <div className=" font-semibold text-center">{user?.name}</div>
            <div className=" flex items-center justify-center text-xs text-gray-500  gap-2">
              <span>
                <span className=" text-black font-semibold">
                  {user?.following.length}
                </span>{" "}
                Following
              </span>
              <span>
                <span className=" text-black font-semibold">
                  {user?.follower.length}
                </span>{" "}
                Followers
              </span>
            </div>

            <Link to={"/profile/" + user?._id}>
              <button className=" text-sm  mt-2 rounded-md text-white px-4 py-2 bg-black ">
                My Profile
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
