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
          "/api/v1/user/whoToFollow/" + currentUser?._id
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
  }, [currentUser?._id]);

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
    <div className="p-4 w-full  shadow-md bg-white rounded-lg flex flex-col gap-4 overflow-y-scroll customScrollBar h-96">
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
          <div className=" flex justify-between items-center ">
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
                    <div className=" flex items-center gap-1">
                      <span className=" font-medium">{user?.name} </span>

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
