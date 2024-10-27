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
        const response = await axios.get("/api/v1/user/" + currentUser?._id);

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
  }, [currentUser?._id]);

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
            <div className=" flex items-center gap-1">
              <div className=" font-semibold text-center">{user?.name}</div>

              {user?.verified && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
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
