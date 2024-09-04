import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/features/userSlice";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  // const [loading, setLoading] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    const fectchNotification = async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get(
          "/api/v1/user/notifications/" + user._id
        );

        setNotifications(data);
        // setLoading(false);
        console.log(data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        toast.error(message);
      }
    };

    fectchNotification();
  }, [user._id]);

  const notificationIcon = (type) => {
    if (type === "like") {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-red-400"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>
      );
    } else if (type === "comment") {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-orange-400"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
  };
  return (
    <>
      {notifications.length > 0 && (
        <div className=" px-2  pb-4 h-80 shadow-md bg-white rounded-lg flex overflow-y-scroll customScrollBar flex-col gap-4">
          <div className=" flex pt-4 bg-white z-40 justify-between sticky top-0 items-center">
            <span className="  font-medium tracking-wide">Notifications</span>

            <Link className=" text-xs text-blue-500" to={"/"}>
              See all
            </Link>
          </div>

          {notifications?.map((notification) => {
            return (
              <div
                key={notification?._id}
                className="flex  gap-2 bg-gray-100 rounded-lg p-1.5 justify-between items-center"
              >
                <div className=" flex items-center gap-3">
                  {notificationIcon(notification?.type)}

                  <div>
                    <img
                      src={notification?.from?.avatar}
                      alt=""
                      className=" w-8 h-8 object-cover  rounded-full"
                    />
                  </div>
                  <p className="text-sm leading-3">{notification?.msg}</p>
                </div>

                {notification?.post && (
                  <div className=" ">
                    <img
                      src={notification?.post.photo[0]}
                      alt=""
                      className=" w-14 h-14 object-cover  rounded-lg"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Notifications;
