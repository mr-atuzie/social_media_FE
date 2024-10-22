import axios from "axios";
import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const FollowingCard = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    const followers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/user/following/" + user?._id);

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
              <h1 className=" tracking-wide font-medium">Following</h1>
              <p className=" text-xs -mt-1 capitalize text-gray-400">
                People that you follow
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
                      <span className=" font-medium">{user?.name}</span>
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
              not following anybody
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FollowingCard;
