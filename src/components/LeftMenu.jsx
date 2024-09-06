import React from "react";
import ProfileCard from "./ProfileCard";
// import { Link } from "react-router-dom";
import Followers from "./Followers";

const LeftMenu = ({ type }) => {
  return (
    <div className=" flex flex-col gap-6">
      {type === "home" && <ProfileCard />}

      <Followers />
    </div>
  );
};

export default LeftMenu;
