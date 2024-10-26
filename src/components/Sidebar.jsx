import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/userSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.get("/api/v1/user/logout");

      //  dispatch(SET_USER(data));
      dispatch(SET_LOGIN(false));

      console.log(data);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      //  setErrMsg(message);
      console.log(error);
      toast.error(message);
      setLoading(false);
    }
  };
  return (
    <div className="p-4 shadow-md bg-white text-sm rounded-lg flex flex-col text-gray-500 gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
            : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
        }
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" size-5  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
        <span>Home</span>
      </NavLink>
      <hr className=" border-t  border-gray-100 w-[80%] self-center" />
      <NavLink
        className={({ isActive }) =>
          isActive
            ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
            : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
        }
        to={"/notifications"}
      >
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
        <span>Notifications</span>
      </NavLink>
      <hr className=" border-t  border-gray-100 w-[80%] self-center" />

      <NavLink
        className={({ isActive }) =>
          isActive
            ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
            : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
        }
        to={"/followers"}
      >
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
        <span>Followers</span>
      </NavLink>
      <hr className=" border-t  border-gray-100 w-[80%] self-center" />
      {/* <NavLink
        className={({ isActive }) =>
          isActive
            ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
            : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
        }
        to={"/*"}
      >
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
        <span>Stories</span>
      </NavLink> */}
      {/* <hr className=" border-t  border-gray-100 w-[80%] self-center" /> */}

      <button
        onClick={logout}
        disabled={loading}
        className=" disabled:opacity-50 w-full flex items-center  text-red-600  gap-4 :bg-gray-100 p-2 rounded-lg"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span>Log out</span>
      </button>
      <hr className=" border-t  border-gray-100 w-[80%] self-center" />
    </div>
  );
};

export default Sidebar;
