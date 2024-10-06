import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
const { format } = require("date-fns");

const UserInfoCard = ({ user }) => {
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);

  const followUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch("/api/v1/user/follow/" + user._id);

      setLoading(false);
      setIsFollowing(data.isFollowing);
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

  useEffect(() => {
    const isFollowing = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/user/isFollowing/" + user?._id
        );

        // console.log(data);
        setIsFollowing(data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(error);
        console.log(message);
        toast.error(message);
      }
    };

    isFollowing();
  }, [user?._id]);

  return (
    <div className="p-4 text-sm shadow-md bg-white rounded-lg flex flex-col gap-4">
      <div className=" flex justify-between items-center">
        <span className=" tracking-wide font-medium text-base">
          UserInfoCard
        </span>

        {currentUser === user?._id && (
          <Link className=" text-xs text-blue-500" to={"/"}>
            Edit profile
          </Link>
        )}
      </div>
      <div>
        <div className=" flex flex-col text-gray-500 gap-2">
          <div className=" items-center gap-2 flex   ">
            <div className=" text-black text-xl">{user?.name}</div>
            <div className=" text-sm ">@{user?.username}</div>
          </div>

          {user?.description && <p>{user?.description}</p>}

          {user?.city && (
            <div className=" flex items-center gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div>
                Living in <b>{user.city}</b>
              </div>
            </div>
          )}

          {user?.school && (
            <div className=" flex gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
              </div>
              <div>
                Went to <b>{user.school}</b>
              </div>
            </div>
          )}

          {user?.work && (
            <div className=" flex gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div>
                Work at <b>{user.work}</b>
              </div>
            </div>
          )}
          <div className=" flex gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>
            <span className=" ">
              Joined{" "}
              {user?.createdAt && format(user?.createdAt, "dd MMMM yyyy")}
            </span>
          </div>

          {currentUser?._id !== user?._id &&
            (isFollowing ? (
              <button
                disabled={loading}
                onClick={followUser}
                className=" disabled:opacity-60 bg-black text-white text-sm rounded-md p-2"
              >
                Following
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={followUser}
                className=" disabled:opacity-60 bg-black text-white text-sm rounded-md p-2"
              >
                Follow
              </button>
            ))}

          {/* <span className=" font-medium text-red-400 self-end text-xs cursor-pointer">
            Block User
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
