import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/features/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const FriendRequests = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const whoToFollow = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "/api/v1/user/whoToFollow/" + currentUser._id
        );

        // console.log(data);

        setLoading(false);
        setUsers(data);
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

    whoToFollow();
  }, [currentUser._id]);

  const followUser = async (userId) => {
    try {
      const { data } = await axios.patch("/api/v1/user/follow/" + userId);

      console.log(data);
      setUsers(data.usersToFollow);
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
    <div className="p-4 w-full  shadow-md bg-white rounded-lg flex flex-col gap-4">
      {loading ? (
        <div>
          <div className=" w-10 h-10 rounded-full bg-gray-100"></div>
          <div className=" flex  flex-col mt-1 ">
            <div className=" font-semibold text-center w-[50%] bg-gray-100 p-2"></div>
            <div className=" flex items-center my-2 rounded-lg justify-center w-full h-40 text-xs bg-gray-100 p-2 text-gray-500  gap-2"></div>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex justify-between items-center">
            <span className=" tracking-wide font-medium">
              Suggested for you
            </span>

            <Link className=" text-xs text-blue-500" to={"/"}>
              See all
            </Link>
          </div>

          {users?.map((user) => {
            return (
              <div
                key={user?._id}
                className=" flex justify-between items-center  text-sm"
              >
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
                  className=" text-sm  rounded-md text-white px-4 py-2 bg-black "
                >
                  follow
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FriendRequests;
