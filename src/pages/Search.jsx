import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import RightMenu from "../components/RightMenu";
import FriendRequests from "../components/FriendRequests";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    setNotFound(false);
    setLoading(true);
    if (!search) {
      toast.error("Enter search field");
    }

    try {
      const { data } = await axios.post("/api/v1/user/search", {
        username: search,
      });

      setLoading(false);
      console.log(data);

      if (data.length < 1) {
        setNotFound(true);
      }
      setUsers(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
      setLoading(false);
    }
  };
  const loader = [1, 2];
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-6 w-[25%]">
        <ProfileCard />
        <Sidebar />
      </div>
      <div className="w-full mb-16 md:w-[70%] lg:w-[45%]">
        <div className=" flex-col gap-6 flex">
          <div className=" bg-white rounded-lg p-4 shadow-md">
            <form onSubmit={searchUser}>
              <input
                className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
                type="text"
                id="username"
                name="username"
                placeholder="Search  username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </form>
            {loading ? (
              loader.map((l) => (
                <div key={l} className="flex my-4">
                  <div className=" w-10 h-10 rounded-full bg-gray-100"></div>
                  <div className=" w-full flex-1 ">
                    <div className=" font-semibold text-center w-[80%]  bg-gray-100 p-2"></div>
                    <div className=" flex items-center my-2 w-[40%] rounded-lg justify-center  bg-gray-100 p-2 text-gray-500  gap-2"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" my-4">
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
                        </div>
                        <hr className=" border-t  border-gray-100 mt-2 w-[90%] rounded-lg self-center" />
                      </div>
                    );
                  })}

                {notFound && (
                  <div className=" text-gray-500  my-4 text-sm capitalize ">
                    No user found
                  </div>
                )}
              </div>
            )}
          </div>
          <FriendRequests />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Search;
