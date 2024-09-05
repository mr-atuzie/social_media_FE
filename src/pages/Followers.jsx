import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import FriendRequests from "../components/FriendRequests";
import Ad from "../components/Ad";
import toast from "react-hot-toast";

const Followers = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);
  //   const [following, setFollowing] = useState(false);

  useEffect(() => {
    const followers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/user/followers/" + user._id);
        const response = await axios.get("/api/v1/user/" + user._id);
        console.log(response.data);
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

  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:block w-[25%]">
        <ProfileCard />
      </div>
      <div className="w-full md:w-[70%] lg:w-[45%]">
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
              <div className=" flex  gap-4">
                <span className=" text-sm  tracking-wide font-medium">
                  Followers
                </span>

                <span className="  text-sm tracking-wide font-medium">
                  Following
                </span>
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
                            <span className=" font-medium">{user?.name}</span>
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
                      <hr className=" border-t  border-gray-100 mt-2 w-[90%] rounded-lg self-center" />
                    </div>
                  );
                })}

              {users?.length < 1 && (
                <div className=" text-gray-500 text-sm capitalize font-mono">
                  You have no followers
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex w-[30%] flex-col gap-6 ">
        <FriendRequests />
        <Ad />
      </div>
    </div>
  );
};

export default Followers;
