import React, { useEffect, useState } from "react";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PostLoader from "../components/PostLoader";
import { selectUser } from "../redux/features/userSlice";
import toast from "react-hot-toast";
import Post from "../components/Post";

const Profile = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/post/user/" + id);
        console.log(data.posts);
        setLoading(false);

        setPosts(data.posts);
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

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const { data } = await axios.get("/api/v1/user/" + id);
  //       console.log(data);

  //       setUser(data);
  //     } catch (error) {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       console.log(error);
  //       console.log(message);
  //     }
  //   };

  //   getPosts();
  // }, [id]);
  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%]">
        {loading ? (
          <PostLoader />
        ) : (
          <>
            <div className=" flex-col gap-6 flex">
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
                <div className=" flex items-center justify-center text-sm    gap-12 mb-4">
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      {posts?.length}
                    </h2>
                    <p className=" ">Posts</p>
                  </div>
                  <div className=" flex flex-col  items-center">
                    <h2 className=" text-black font-semibold">
                      100
                      {/* {user?.followers.length} */}
                    </h2>
                    <p className=" ">Followers</p>
                  </div>
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      345
                      {/* {user?.followings.length} */}
                    </h2>
                    <p className=" ">Followings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-4 shadow-md my-4 bg-white rounded-lg flex flex-col gap-3 lg:gap-6">
              {posts?.map((post) => {
                return <Post key={post?._id} post={post} />;
              })}
            </div>
          </>
        )}
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default Profile;
