import React from "react";
import RightMenu from "../components/RightMenu";
import Feed from "../components/Feed";
import AddPost from "../components/AddPost";
// import Stories from "../components/Stories";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-6 w-[25%]">
        <ProfileCard />
        <Sidebar />
      </div>
      <div className="w-full md:w-[70%] lg:w-[45%]">
        <div className=" flex-col gap-6 flex">
          {/* <Stories /> */}
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Home;
