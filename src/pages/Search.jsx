import React from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import RightMenu from "../components/RightMenu";

const Search = () => {
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-6 w-[25%]">
        <ProfileCard />
        <Sidebar />
      </div>
      <div className="w-full md:w-[70%] lg:w-[45%]">
        <div className=" flex-col gap-6 flex">search</div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Search;
