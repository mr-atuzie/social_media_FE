import React, { useState } from "react";
// import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import Images from "./Images";
import { deletePost } from "../redux/features/postSlice";
const { formatDistanceToNow } = require("date-fns");

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const currentUser = useSelector(selectUser);

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const dispatch = useDispatch();

  const profile = props.profile;

  // Show tooltip on mouse enter
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  // Hide tooltip on mouse leave
  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const liked = post?.likes.includes(currentUser?._id);

  const LikePost = async () => {
    try {
      const { data } = await axios.patch("/api/v1/post/like/" + post?._id);

      setPost(data.post);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
      console.log(error);
    }
  };

  const handleDelete = (postId) => {
    if (profile) {
      props.handleProfileDelete(postId);
    } else {
      dispatch(deletePost(postId));
    }
    // console.log(postId);
  };

  // Function to download multiple images
  const downloadImages = async (imageUrls) => {
    try {
      // Loop through each image URL
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary download link
        const link = document.createElement("a");
        link.href = url;
        link.download = `image-${i + 1}.jpg`; // Dynamic filename for each image
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up the link element
        window.URL.revokeObjectURL(url); // Release the blob URL
      }
      toast.success("Photo saved");
    } catch (error) {
      console.error("Error downloading images:", error);
      toast.error("Error downloading images");
    }
  };

  return (
    <>
      {showAllPhotos && (
        <Images post={post} setShowAllPhotos={setShowAllPhotos} />
      )}
      <div className=" flex flex-col gap-3 lg:gap-4">
        <div className=" flex items-start justify-between">
          <div className=" flex items-center gap-4">
            <Link to={"/profile/" + post?.user?._id}>
              <img
                src={post?.user.avatar}
                alt=""
                className="w-10 h-10 object-cover  rounded-full"
              />
            </Link>

            <div>
              <div className=" flex  items-start gap-1">
                <p className=" font-medium text-sm lg:text-base">
                  {post?.user.name}
                </p>

                {post?.user.verified && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <p className=" text-gray-500 text-xs lg:text-sm">
                  @{post?.user.username}
                </p>
              </div>
              <p className=" text-gray-500 text-xs lg:text-sm">
                posted{" "}
                {post?.createdAt &&
                  formatDistanceToNow(new Date(post?.createdAt), {
                    addSuffix: true,
                  })}
              </p>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Trigger button */}
            <button>
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
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>

            {/* Tooltip content */}
            {isTooltipVisible && (
              <div className="absolute border  z-40 bg-gray-100 px-2   shadow-lg w-44 text-sm  flex flex-col gap-2  rounded-lg py-4  right-3  top-4 mb-2 whitespace-nowrap">
                {/* download post btn */}
                <button
                  onClick={() => downloadImages(post?.photo)}
                  className="flex bg-white rounded-lg w-full p-2 text-center items-center gap-2"
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
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>

                  <span className=" ">Save photo</span>
                </button>

                {/* view photos btn */}
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="flex bg-white  rounded-lg w-full p-2 text-center items-center gap-2"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <span className=" ">View photo</span>
                </button>

                {/* delete post btn */}
                {currentUser?._id === post?.user._id && (
                  <button
                    onClick={() => handleDelete(post?._id)}
                    className="flex items-center p-2 text-center  bg-white text-red-500 rounded-lg gap-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>

                    <span className="">Delete post </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <Link to={"/post/" + post?._id}>
          <p className=" text-sm text-pretty ">{post?.desc}</p>
        </Link>

        <div className=" flex flex-col gap-4">
          <div onClick={() => setShowAllPhotos(true)}>
            {post?.photo.length === 1 && (
              <div className=" overflow-hidden h-72 lg:h-[400px]  rounded-md">
                {post?.photo.map((link, index) => (
                  <div className=" h-full flex  " key={index}>
                    <img
                      className=" bg-gray-200 w-full h-full   object-cover  object-center"
                      src={link}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}

            {post?.photo.length === 2 && (
              <div className=" grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
                {post?.photo.map((link, index) => (
                  <div key={index} className=" h-64 flex">
                    <img
                      className=" bg-gray-200 w-full h-full  object-cover  object-top "
                      src={link}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}

            {post?.photo.length === 3 && (
              <div className="flex gap-1 h-80    rounded-md overflow-hidden  ">
                <div className=" w-[60%]">
                  <img
                    className=" bg-gray-200 w-full h-full  object-cover object-top"
                    src={post?.photo[0]}
                    alt=""
                  />
                </div>
                <div className=" flex gap-1 flex-col w-[40%]">
                  <div className=" h-[50%]">
                    <img
                      className=" w-full h-full  bg-gray-200  object-cover object-top "
                      src={post?.photo[1]}
                      alt=""
                    />
                  </div>
                  <div className="h-[50%]">
                    <img
                      className=" w-full h-full flex-1 bg-gray-200  object-cover object-top "
                      src={post?.photo[2]}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}

            {post?.photo.length === 4 && (
              <div className=" grid grid-cols-2 gap-1 overflow-hidden rounded-md ">
                {post?.photo.map((link, index) => (
                  <div key={index} className=" h-56 flex">
                    <img
                      className=" bg-gray-200 w-full h-full  object-cover object-top"
                      src={link}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* interaction */}
        <div className=" flex items-center text-sm justify-between ">
          <div className="flex gap-4 md:gap-6 lg:gap-8 ">
            <button
              onClick={LikePost}
              className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl"
            >
              <div>
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-red-500 lg:size-6"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 lg:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </div>
              <span className=" text-gray-300">|</span>
              <span className=" text-xs lg:text-sm text-gray-500">
                {post?.likes?.length}{" "}
                <span className=" hidden md:inline">Likes</span>
              </span>
            </button>
            <Link to={"/post/" + post?._id}>
              <div className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 lg:size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                </div>
                <span className=" text-gray-300">|</span>
                <span className=" text-xs lg:text-sm text-gray-500">
                  {post?.comments.length}{" "}
                  <span className=" hidden md:inline">Comments</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <hr className=" border-t  border-gray-100 w-full self-center" />
    </>
  );
};

export default Post;
