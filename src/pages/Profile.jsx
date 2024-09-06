import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const currentUser = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(null);

  const { id } = useParams();

  const followUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch("/api/v1/user/follow/" + user._id);

      setLoading(false);
      setIsFollowing(data.isFollowing);
    } catch (error) {
      setLoading(false);
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
            <div className=" flex-col lg:gap-6 flex">
              <div className=" flex flex-col items-center justify-center">
                <div className=" h-52 lg:h-64 w-full relative">
                  <img
                    src={user?.coverPic}
                    alt=""
                    className=" h-full w-full bg-gray-400 rounded-md object-cover"
                  />
                  <div className=" ">
                    <img
                      src={user?.avatar}
                      alt=""
                      className=" w-24 lg:w-32 h-24 lg:h-32 absolute left-0 right-0 m-auto -bottom-16 bg-gray-400 rounded-full object-cover ring-4 ring-white z-20"
                    />
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
                  <div className=" flex flex-col  items-center">
                    <h2 className=" text-black font-semibold">
                      {user?.follower.length}
                    </h2>
                    <p className=" ">Followers</p>
                  </div>
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      {user?.following.length}
                    </h2>
                    <p className=" ">Followings</p>
                  </div>
                </div>
              </div>

              {currentUser?._id !== user?._id && (
                <div className=" flex justify-center items-center md:hidden">
                  {isFollowing ? (
                    <button
                      disabled={loading}
                      onClick={followUser}
                      className=" disabled:opacity-60 w-[60%] text-center bg-black text-white text-sm rounded-md p-2"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      disabled={loading}
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
