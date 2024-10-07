import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../redux/features/userSlice";

const MobileNav = () => {
  const user = useSelector(selectUser);
  return (
    <div className=" bg-white border-t bottom-0 z-40  fixed w-full p-3 flex justify-between items-center  lg:hidden">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? " text-black font-medium" : "text-gray-500"
        }
      >
        <div className=" flex flex-col justify-center gap-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <p className=" text-xs">Home</p>
        </div>
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? " text-black font-medium" : "text-gray-500"
        }
      >
        <div className=" flex flex-col justify-center gap-1 items-center">
          <span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </span>
          <p className=" text-xs">Search</p>
        </div>
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          isActive ? " text-black font-medium" : "text-gray-500"
        }
      >
        <div className=" flex flex-col justify-center gap-1 items-center">
          <span>
            <div className=" relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              <div className=" w-2 h-2 bg-red-600 rounded-full top-1 right-0 absolute"></div>
            </div>
          </span>
          <p className=" text-xs">Notifications</p>
        </div>
      </NavLink>

      <NavLink
        to="/followers"
        className={({ isActive }) =>
          isActive ? " text-black font-medium" : "text-gray-500"
        }
      >
        <div className=" flex flex-col justify-center gap-1 items-center">
          <span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </div>
          </span>
          <p className=" text-xs">Followers</p>
        </div>
      </NavLink>

      <NavLink
        to={`/profile/${user?._id}`}
        className={({ isActive }) =>
          isActive ? " text-black font-medium" : "text-gray-500"
        }
      >
        <div className=" flex flex-col gap-1 justify-center items-center">
          <span>
            <img
              src={
                user?.avatar
                  ? user?.avatar
                  : "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt=""
              className="  w-6 ring-black ring-2 h-6 rounded-full object-cover"
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg> */}
          </span>
          <p className=" text-xs">Profile</p>
        </div>
      </NavLink>
    </div>
  );
};

export default MobileNav;
