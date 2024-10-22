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
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_USER } from "../redux/features/userSlice";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const currentUser = useSelector(selectUser);
  const [isFollowing, setIsFollowing] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { id } = useParams();

  const dispatch = useDispatch();

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

  function uploadPhoto(ev) {
    setSelectedImage(ev.target.files[0]);
    setPreviewImage(URL.createObjectURL(ev.target.files[0]));
  }

  const uploadCoverPicture = async () => {
    setUploading(true);
    if (!selectedImage) {
      setUploading(false);
      return alert("Please select image");
    }

    try {
      const file = selectedImage;
      const dataDoc = new FormData();

      dataDoc.append("file", file);
      dataDoc.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      dataDoc.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

      const res = await fetch(process.env.REACT_APP_CLOUD_URL, {
        method: "post",
        body: dataDoc,
      });

      const imageData = await res.json();

      const uploadedFileUrl = imageData.secure_url.toString();

      console.log(uploadedFileUrl);

      const { data } = await axios.patch("/api/v1/user/coverPhoto", {
        photo: uploadedFileUrl,
      });

      console.log(data);
      setUser(data);
      setUploading(false);
      setSelectedImage(null);

      dispatch(SET_USER(data));

      toast.success("Cover picture updated");
    } catch (error) {
      console.log(error);
      setUploading(false);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
    }
  };

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
                  {selectedImage && (
                    <button
                      onClick={() => setSelectedImage(null)}
                      className=" cursor-pointer  absolute flex justify-center items-center  top-3 left-3 p-2 h-10 w-10 rounded-full bg-black opacity-70 text-white"
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                  {currentUser?._id === user?._id && (
                    <>
                      {selectedImage ? (
                        <button
                          disabled={uploading}
                          onClick={uploadCoverPicture}
                          className="  opacity-70 cursor-pointer  absolute flex justify-center items-center  top-3 right-3 p-2 h-10 w-10 rounded-full bg-black text-white"
                        >
                          {uploading ? (
                            <span>
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span>
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
                                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                />
                              </svg>
                            </span>
                          )}
                        </button>
                      ) : (
                        <div>
                          <label
                            htmlFor="coverPic"
                            className=" cursor-pointer  absolute flex justify-center items-center  top-3 right-3 p-2 h-10 w-10 rounded-full bg-black text-white"
                          >
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
                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                              />
                            </svg>
                          </label>
                          <input
                            name="coverPic"
                            id="coverPic"
                            type="file"
                            className="hidden"
                            onChange={uploadPhoto}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <img
                    src={selectedImage ? previewImage : user?.coverPic}
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

                <div className=" flex items-center justify-center text-sm  gap-8  md:gap-12 mb-4">
                  <div className=" flex flex-col items-center">
                    <h2 className=" text-black font-semibold">
                      {posts?.length}
                    </h2>
                    <p className=" text-sm lg:text-base ">Posts</p>
                  </div>
                  <Link to={"/follower"}>
                    <div className=" flex flex-col  items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.follower.length}
                      </h2>
                      <p className=" text-sm lg:text-base ">Followers</p>
                    </div>
                  </Link>

                  <Link to={"/follower"}>
                    <div className=" flex flex-col items-center">
                      <h2 className=" text-black font-semibold">
                        {user?.following.length}
                      </h2>
                      <p className=" text-sm lg:text-base ">Followings</p>
                    </div>
                  </Link>
                </div>
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

            <div className=" lg:hidden">
              {user && <UserMediaCard user={user} />}
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
