import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import PostLoader from "../components/PostLoader";
import RightMenu from "../components/RightMenu";
import Comments from "../components/Comments";
import { formatDistanceToNow } from "date-fns";
import { selectUser } from "../redux/features/userSlice";
import Images from "../components/Images";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Followers from "../components/Followers";

const Post = () => {
  const { id } = useParams();

  const currentUser = useSelector(selectUser);

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const liked = post?.likes.includes(currentUser?._id);

  useEffect(() => {
    const fectchSinglePost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/post/" + id);
        const response = await axios.get("/api/v1/post/comments/" + id);

        setPost(data);
        setComments(response.data.comments);
        setLoading(false);
      } catch (error) {
        const message = setLoading(false);
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

        toast.error(message);
      }
    };

    fectchSinglePost();
  }, [id]);

  const likePost = async () => {
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

  return (
    <>
      {showAllPhotos && (
        <Images post={post} setShowAllPhotos={setShowAllPhotos} />
      )}
      <div className=" flex gap-6 pt-6">
        <div className="hidden lg:flex flex-col   gap-6  w-[25%]">
          <Followers />

          <Sidebar />
        </div>

        {loading ? (
          <div className="w-full  mb-16  md:w-[70%] lg:w-[40%]">
            <PostLoader single />
          </div>
        ) : (
          <div className="w-full p-4 rounded-lg mb-16 bg-white md:w-[70%] lg:w-[40%]">
            <div className="  flex-col gap-6 flex">
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
                      <div className=" flex  items-center gap-2">
                        <p className=" font-medium text-sm lg:text-base">
                          {post?.user.name}
                        </p>
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
                  <Tooltip
                    placement="bottomRight'"
                    trigger={["click"]}
                    overlay={<span>tooltip</span>}
                  >
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
                  </Tooltip>
                </div>

                <p className=" text-sm text-pretty ">{post?.desc}</p>

                <div className=" flex flex-col gap-4">
                  <div onClick={() => setShowAllPhotos(true)}>
                    {post?.photo.length === 1 && (
                      <div className=" overflow-hidden h-96 rounded-lg">
                        {post?.photo.map((link, index) => (
                          <div className=" h-full flex  " key={index}>
                            <img
                              className=" bg-gray-200 w-full h-full  object-cover "
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
                          <div key={index} className=" h-48 flex">
                            <img
                              className=" bg-gray-200 w-full h-full  object-cover "
                              src={link}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {post?.photo.length === 3 && (
                      <div className="grid gap-1 h-64  grid-cols-[2fr_1fr]  rounded-lg overflow-hidden ">
                        <div className=" h-full flex">
                          <img
                            className=" bg-gray-200 w-full h-full  object-cover "
                            src={post?.photo[0]}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className=" flex-1 h-full flex ">
                            <img
                              className=" w-full h-full bg-gray-200  object-cover "
                              src={post?.photo[1]}
                              alt=""
                            />
                          </div>
                          <div className=" flex-1 h-full flex ">
                            <img
                              className=" w-full h-full bg-gray-200  object-cover "
                              src={post?.photo[2]}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {post?.photo.length === 4 && (
                      <div className=" grid grid-cols-2 gap-1 overflow-hidden rounded-lg">
                        {post?.photo.map((link, index) => (
                          <div key={index} className=" h-48 flex">
                            <img
                              className=" bg-gray-200 w-full h-full  object-cover "
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
                      onClick={likePost}
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
                  </div>

                  {/* <div className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl">
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
                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                        />
                      </svg>
                    </div>
                    <span className=" text-gray-300">|</span>
                    <span className=" text-xs lg:text-sm text-gray-500">
                      100 <span className=" hidden md:inline">Repost</span>
                    </span>
                  </div> */}
                </div>
              </div>
              <hr className=" border-t  border-gray-100 w-[95%] self-center" />

              <Comments post={post} setComments={setComments} />
              {comments?.map((comment) => {
                return (
                  <div key={comment?._id} className=" flex items-center gap-3">
                    <Link to={"/profile/" + comment?.user?._id}>
                      <div className="w-8 h-8">
                        <img
                          src={comment?.user.avatar}
                          alt=""
                          className=" w-full h-full object-cover  rounded-full"
                        />
                      </div>
                    </Link>

                    <div className=" bg-gray-100 rounded-lg p-2 w-full">
                      <p className=" font-medium m-0 text-sm lg:text-base">
                        {comment?.user.name}
                      </p>

                      <p className=" text-gray-500 -mt-1 text-sm lg:text-sm">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="hidden md:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </>
  );
};

export default Post;
