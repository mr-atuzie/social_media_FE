import React from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import RightMenu from "../components/RightMenu";
import FriendRequests from "../components/FriendRequests";

const Search = () => {
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-6 w-[25%]">
        <ProfileCard />
        <Sidebar />
      </div>
      <div className="w-full md:w-[70%] lg:w-[45%]">
        <div className=" flex-col gap-6 flex">
          <div className=" bg-white rounded-lg p-4 shadow-md">
            <div>
              <label className=" text-sm" htmlFor="username">
                Search
              </label>
              <input
                className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
