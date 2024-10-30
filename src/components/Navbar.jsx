import { Link, NavLink, useNavigate } from "react-router-dom";
// import MobileMenu from "./MobileMenu";
import ShowOnLogin, { ShowOnLogOut } from "./Protect";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_LOGIN } from "../redux/features/userSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AddPostCard from "./AddPostCard";

const Navbar = () => {
  const user = useSelector(selectUser);
  const [menu, setMenu] = useState(false);
  const [addpost, setAddPost] = useState(false);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.get("/api/v1/user/logout");

      dispatch(SET_LOGIN(false));
      console.log(data);
      setLoading(false);

      setMenu(false);
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
    <nav className="bg-white sticky w-full top-0 z-50 flex items-center  py-5 shadow-md">
      <div className=" w-[95%] flex justify-between items-center lg:w-[85%] mx-auto ">
        {/* LEFT */}
        <div className=" md:hidden lg:block ">
          <Link to={"/"}>
            <h1 className=" text-2xl lg:text-4xl logo font-semibold text-gray-800 tracking-wide hover:text-gray-600 transition duration-300 ease-in-out">
              Foto<span className="text-green-500">Verse</span>
            </h1>
          </Link>
        </div>

        {/* MIDDLE */}
        <div className=" hidden md:flex items-center w-[60%]   justify-between">
          <div className="flex gap-6">
            <NavLink
              className={({ isActive }) => (isActive ? " text-green-500" : "")}
              to={"/"}
            >
              <div className=" flex gap-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className=" size-6  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <span className=" text-sm  ">Homepage</span>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? " text-green-500" : "")}
              to={"/followers"}
            >
              <div className=" flex gap-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
                <span className=" text-sm ">Followers</span>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? " text-green-500" : "")}
              to={"/notifications"}
            >
              <div className=" flex gap-2 items-center">
                <div className=" relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                  <div className=" w-2 h-2 bg-red-600 rounded-full top-1 right-0 absolute"></div>
                </div>
                <span className=" text-sm ">Notifications</span>
              </div>
            </NavLink>

            <button
              onClick={() => setAddPost(true)}
              className=" flex gap-2 items-center"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <span className=" text-sm ">Add Post</span>
            </button>
          </div>

          <Link to={"/search"}>
            <div className="hidden lg:flex px-4 py-2 bg-slate-100 items-center rounded-xl">
              <input
                type="text"
                placeholder="Search..."
                className=" bg-transparent outline-none"
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT */}
        <div className=" flex gap-2 items-center">
          <ShowOnLogin>
            <div className="cursor-pointer flex items-center gap-4 lg:gap-6">
              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-green-500" : ""
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
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-green-500" : ""
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
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                  <div className=" w-2 h-2 bg-red-600 rounded-full top-1 right-0 absolute"></div>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? " text-green-500" : ""
                }
                to={"/search"}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </NavLink>

              <button
                className=" lg:hidden z-50 rounded-full object-cover"
                onClick={() => setMenu((prev) => !prev)}
              >
                {menu ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>

              <Link to={"/profile/" + user?._id}>
                <img
                  // onClick={() => setMenu((prev) => !prev)}
                  src={
                    user?.avatar
                      ? user?.avatar
                      : "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt=""
                  className=" hidden lg:block w-8 ring-black ring-2 h-8 rounded-full object-cover"
                />
              </Link>
            </div>
          </ShowOnLogin>

          <ShowOnLogOut>
            <Link to={"/login"}>
              <div className=" flex gap-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <span className=" text-sm  ">Login/Register</span>
              </div>
            </Link>
          </ShowOnLogOut>

          {/* <MobileMenu /> */}
        </div>
      </div>
      {menu && (
        <div className=" bg-black/10 w-full absolute h-screen z-40 left-0 top-0">
          <div className="  shadow-md p-4 w-[85%] h-full bg-white">
            <Link to={"/profile/" + user?._id}>
              <img
                onClick={() => setMenu((prev) => !prev)}
                src={
                  user?.avatar
                    ? user?.avatar
                    : "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt=""
                className="  w-14 ring-black ring-2 h-14 rounded-full object-cover"
              />
            </Link>

            <div className=" px-2 my-3">
              <div className=" flex items-center gap-1">
                <h1 className=" text-lg font-semibold">{user?.name}</h1>
                {user?.verified && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-green-500"
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
              <h5 className=" text-sm -mt-1 text-gray-500">
                @{user?.username}
              </h5>
            </div>

            <hr className=" border-t my-2  border-gray-200 w-full self-center" />

            <div className=" flex flex-col gap-3">
              <NavLink
                to="/"
                onClick={() => setMenu((prev) => !prev)}
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

              <NavLink
                onClick={() => setMenu((prev) => !prev)}
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

              <NavLink
                onClick={() => setMenu((prev) => !prev)}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
                    : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
                }
                to={"/search"}
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <span>Search</span>
              </NavLink>

              <NavLink
                onClick={() => setMenu((prev) => !prev)}
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

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center gap-4  bg-gray-100 p-2 rounded-lg"
                    : "flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg"
                }
                to={"/profile/" + user?._id}
                onClick={() => setMenu((prev) => !prev)}
              >
                <div>
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <span>Profile</span>
              </NavLink>
            </div>

            <hr className=" border-t  border-gray-200 mt-4 w-full self-center" />

            <button
              onClick={logout}
              disabled={loading}
              className="  w-full mt-8  flex items-center  text-red-500 gap-2 bg-red-50  p-2.5 rounded-lg"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
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
          </div>
        </div>
      )}
      {addpost && (
        <div className=" fixed inset-0 z-50 w-full h-screen hide-scrollbar overflow-hidden flex justify-center items-center  bg-black/50">
          <AddPostCard setAddPost={setAddPost} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
