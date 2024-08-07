import React from "react";
import { Link } from "react-router-dom";

const UserMediaCard = ({ userId }) => {
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-4">
      <div className=" flex justify-between items-center">
        <span className=" tracking-wide font-medium">User Media</span>

        <Link className=" text-xs text-blue-500" to={"/"}>
          See all
        </Link>
      </div>
      <div className=" flex gap-4 justify-between flex-wrap">
        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/22873531/pexels-photo-22873531/free-photo-of-surfers-going-into-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            fill
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/27101332/pexels-photo-27101332/free-photo-of-portrait-of-hugging-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/18582529/pexels-photo-18582529/free-photo-of-a-man-is-working-on-a-statue-in-a-workshop.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/14116149/pexels-photo-14116149.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/22873531/pexels-photo-22873531/free-photo-of-surfers-going-into-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/27101332/pexels-photo-27101332/free-photo-of-portrait-of-hugging-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/18582529/pexels-photo-18582529/free-photo-of-a-man-is-working-on-a-statue-in-a-workshop.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>

        <div className=" relative w-1/5 h-24">
          <img
            src={
              "https://images.pexels.com/photos/14116149/pexels-photo-14116149.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
            className=" object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
