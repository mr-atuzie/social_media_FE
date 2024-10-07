import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import PostLoader from "../components/PostLoader";
import toast from "react-hot-toast";
import Post from "../components/Post";
import Followers from "../components/Followers";
import FollowingCard from "../components/FollowingCard";
import UserInfoCard from "../components/UserInfoCard";
import UserMediaCard from "../components/UserMediaCard";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const currentUser = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(null);

  const { id } = useParams();

  const followUser = async () => {
    setFollowLoading(true);
    try {
      const { data } = await axios.patch("/api/v1/user/follow/" + user._id);

      setFollowLoading(false);
      setIsFollowing(data.isFollowing);
    } catch (error) {
      setFollowLoading(false);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/user/" + id);
        const { data } = await axios.get("/api/v1/post/user/" + id);
        const isFollow = await axios.get("/api/v1/user/isFollowing/" + id);

        setIsFollowing(isFollow.data);

        setLoading(false);
        setPosts(data.posts);
        setUser(response.data);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(message);
      }
    };

    fetchUserPosts();
  }, [id]);

  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:flex flex-col gap-5 w-[25%]">
        <FollowingCard />
        <Followers />
      </div>
      <div className="w-full md:w-[65%] mb-24 lg:w-[45%]">
        {loading ? (
          <PostLoader />
        ) : (
          <>
            <div className=" flex-col  lg:gap-6 flex">
              <div className=" flex flex-col items-center justify-center">
                <div className=" h-52 lg:h-64 w-full relative">
                  <img
                    src={user?.coverPic}
                    alt=""
                    className=" h-full w-full bg-gray-400 rounded-md object-cover"
                  />
                  <div className="absolute left-0 right-0 m-auto w-24 lg:w-32 h-24 lg:h-32  -bottom-16">
                    <img
                      src={user?.avatar}
                      alt=""
                      className=" w-full h-full  bg-gray-400 rounded-full object-cover ring-4 ring-white z-20"
                    />
                    <Link
                      to={"/uploadPhoto"}
                      className=" cursor-pointer  absolute -bottom-4 right-2 p-2 h-10 w-10 rounded-full bg-black text-white"
                    >
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
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <h1 className=" mt-20  font-medium text-2xl">
                  {user?.username}
                </h1>
                <p className=" mb-4 text-xs lg:text-sm text-gray-500">
                  {user?.name}
                </p>

                <div className=" flex items-center justify-center text-sm  gap-6  md:gap-12 mb-4">
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      {posts?.length}
                    </h2>
                    <p className=" ">Posts</p>
                  </div>
                  <Link to={"/follower"}>
                    <div className=" flex flex-col  items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.follower.length}
                      </h2>
                      <p className=" ">Followers</p>
                    </div>
                  </Link>

                  <Link to={"/follower"}>
                    <div className=" flex flex-col items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.following.length}
                      </h2>
                      <p className=" ">Followings</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* <div className=" flex gap-6 items-center">
                image container
                <div className="relative   w-20 lg:w-32 h-20 lg:h-32 ">
                  <img
                    src={user?.avatar}
                    alt=""
                    className=" shadow-md w-full h-full  bg-gray-400 rounded-full object-cover"
                  />
                  <Link
                    to={"/uploadPhoto"}
                    className=" cursor-pointer  absolute -bottom-2 right-0 p-2 h-8 w-8 rounded-full bg-black text-white"
                  >
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
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </Link>
                </div>

                post ,follower, following
                <div className=" flex items-center justify-center text-sm  gap-6  md:gap-12 mb-4">
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      {posts?.length}
                    </h2>
                    <p className=" ">Posts</p>
                  </div>
                  <Link to={"/followers"}>
                    <div className=" flex flex-col  items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.follower.length}
                      </h2>
                      <p className=" ">Followers</p>
                    </div>
                  </Link>

                  <Link to={"/followers"}>
                    <div className=" flex flex-col items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.following.length}
                      </h2>
                      <p className=" ">Followings</p>
                    </div>
                  </Link>
                </div>
              </div> */}

              <div className=" mt-2">
                <h1 className="font-medium  capitalize lg:text-2xl">
                  {user?.username}
                </h1>
                <p className=" mb-4 text-xs lg:text-sm text-gray-500">
                  {user?.name}
                </p>
              </div>

              {currentUser?._id !== user?._id && (
                <div className=" flex justify-center items-center md:hidden">
                  {isFollowing ? (
                    <button
                      disabled={followLoading}
                      onClick={followUser}
                      className=" disabled:opacity-60 w-[60%] text-center bg-black text-white text-sm rounded-md p-2"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      disabled={followLoading}
                      onClick={followUser}
                      className=" disabled:opacity-60 w-[60%] text-center bg-black text-white text-sm rounded-md p-2"
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className=" p-4 shadow-md my-4 bg-white rounded-lg flex flex-col gap-3 lg:gap-6">
              {posts?.map((post) => {
                return <Post key={post?._id} post={post} />;
              })}
            </div>
          </>
        )}
      </div>
      <div className="hidden md:flex flex-col gap-5 w-[30%]">
        {user && <UserInfoCard user={user} />}

        {user && <UserMediaCard user={user} />}
      </div>
    </div>
  );
};

export default Profile;
