import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Ad from "../components/Ad";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

const Followers = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const followers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/user/followers/" + user._id);
        const response = await axios.get("/api/v1/user/" + user._id);

        setUsers(data);
        setLoading(false);
        setCurrentUser(response.data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        console.log(error);
        console.log(message);
      }
    };

    followers();
  }, [user._id]);

  const loader = [1, 2, 3, 4, 5, 6];

  const followUser = async (userId) => {
    try {
      await axios.patch("/api/v1/user/follow/" + userId);

      const response = await axios.get("/api/v1/user/" + user._id);
      setCurrentUser(response.data);
    } catch (error) {
      setLoading(false);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
    }
  };

  const getfollowing = async () => {
    setFollowing(true);
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/user/following/" + user._id);

      setUsers(data);
      console.log({ following: data });

      setLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      console.log(error);
      console.log(message);
      toast.error(message);
    }
  };

  const getfollowers = async () => {
    setFollowing(false);
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/user/followers/" + user._id);
      const response = await axios.get("/api/v1/user/" + user._id);

      setUsers(data);
      setLoading(false);
      setCurrentUser(response.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setLoading(false);
      console.log(error);
      console.log(message);
    }
  };

  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-5 w-[25%]">
        <ProfileCard />
        <Sidebar />
      </div>
      <div className="w-full md:w-[70%] lg:w-[45%] flex flex-col gap-10">
        <div className="p-4 w-full  shadow-md bg-white rounded-lg flex flex-col gap-4">
          {loading ? (
            loader.map((l) => (
              <div key={l} className="flex">
                <div className=" w-10 h-10 rounded-full bg-gray-100"></div>
                <div className=" w-full flex-1 ">
                  <div className=" font-semibold text-center w-[80%]  bg-gray-100 p-2"></div>
                  <div className=" flex items-center my-2 w-[40%] rounded-lg justify-center  bg-gray-100 p-2 text-gray-500  gap-2"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className=" flex  gap-8">
                <div className=" flex flex-col justify-center">
                  <button
                    onClick={getfollowers}
                    className=" flex items-center justify-center text-sm "
                  >
                    {/* {!following && users?.length}  */}
                    Followers
                  </button>
                  {!following && (
                    <div className=" w-20 h-0.5 bg-black rounded-lg"></div>
                  )}
                </div>

                <div className=" flex flex-col justify-center">
                  <button
                    onClick={getfollowing}
                    className=" flex items-center justify-center text-sm "
                  >
                    {/* {following && users?.length}  */}
                    Following
                  </button>
                  {following && (
                    <div className=" w-20 h-0.5 bg-black rounded-lg"></div>
                  )}
                </div>
              </div>

              {users?.length > 0 &&
                users?.map((user) => {
                  return (
                    <div key={user?._id}>
                      <div className="  flex justify-between items-center  text-sm">
                        <div className=" flex items-center gap-4">
                          <Link to={"/profile/" + user._id}>
                            <div>
                              <img
                                src={user?.avatar}
                                alt=""
                                className=" w-10 h-10 object-cover  rounded-full"
                              />
                            </div>
                          </Link>

                          <div className=" flex flex-col">
                            <span className=" flex items-center gap-1 font-medium">
                              {user?.name}

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
                            </span>
                            <span className=" text-gray-500 text-xs">
                              @{user?.username}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => followUser(user?._id)}
                          className=" text-sm w-24  rounded-md text-white px-4 py-2 bg-black "
                        >
                          {currentUser?.following.includes(user?._id)
                            ? "following"
                            : "follow"}
                        </button>
                      </div>
                      <hr className=" border-t  border-gray-100 mt-2 w-[90%] mx-auto rounded-lg self-center" />
                    </div>
                  );
                })}

              {users?.length < 1 && (
                <div className=" text-gray-500  text-xs lg:text-sm capitalize font-mono">
                  {following
                    ? "You're not following anyone"
                    : "You have no followers"}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex w-[30%] flex-col gap-6 ">
        <Ad />
      </div>
    </div>
  );
};

export default Followers;
