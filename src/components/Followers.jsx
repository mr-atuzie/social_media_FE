import axios from "axios";
import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Followers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    const followers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/user/followers/" + user?._id);

        setUsers(data);
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

    followers();
  }, [user?._id]);

  return (
    <div className="p-4 w-full  shadow-md bg-white rounded-lg flex flex-col gap-4">
      {loading ? (
        <div className=" flex flex-col gap-3">
          <div className=" flex gap-4 justify-between">
            <div className=" w-8 h-8 rounded-full bg-gray-100"></div>

            <div className=" font-semibold text-center w-[80%] rounded-lg bg-gray-100 p-2"></div>
          </div>
          <div className=" flex gap-4 justify-between">
            <div className=" w-8 h-8 rounded-full bg-gray-100"></div>

            <div className=" font-semibold text-center w-[80%] rounded-lg bg-gray-100 p-2"></div>
          </div>
          <div className=" flex gap-4 justify-between">
            <div className=" w-8 h-8 rounded-full bg-gray-100"></div>

            <div className=" font-semibold text-center w-[80%] rounded-lg bg-gray-100 p-2"></div>
          </div>
          <div className=" flex gap-4 justify-between">
            <div className=" w-8 h-8 rounded-full bg-gray-100"></div>

            <div className=" font-semibold text-center w-[80%] rounded-lg bg-gray-100 p-2"></div>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex justify-between ">
            <div>
              <h2 className=" tracking-wide font-medium">Followers</h2>
              <p className=" text-xs  -mt-1 capitalize text-gray-400">
                people that follow you
              </p>
            </div>

            <Link className=" text-xs text-blue-500" to={"/following"}>
              See all
            </Link>
          </div>

          {users?.length > 0 &&
            users?.map((user) => {
              return (
                <div key={user?._id} className="   text-sm">
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
                        <span className=" font-medium">{user?.name}</span>

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
  );
};

export default Followers;
