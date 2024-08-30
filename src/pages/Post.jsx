import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchComments,
  fetchSinglePost,
  selectComents,
  selectPost,
  selectPostLoader,
} from "../redux/features/postSlice";

import PostLoader from "../components/PostLoader";
import RightMenu from "../components/RightMenu";
import LeftMenu from "../components/LeftMenu";

import Comments from "../components/Comments";
import PostCard from "../components/Post";

const Post = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const post = useSelector(selectPost);

  const comments = useSelector(selectComents);
  const loader = useSelector(selectPostLoader);

  console.log(comments);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    // setP(post);
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);

  return (
    <>
      <div className=" flex gap-6 pt-6">
        <div className="hidden lg:block w-[25%]">
          <LeftMenu />
        </div>
        <div className="w-full p-4 rounded-lg bg-white md:w-[70%] lg:w-[45%]">
          {loader ? (
            <PostLoader />
          ) : (
            <div className="  flex-col gap-6 flex">
              <PostCard post={post} />
              <Comments post={post} />
              {comments?.map((comment) => {
                return (
                  <div className="  p-2 flex items-center gap-4">
                    <Link to={"/profile/" + comment?.user?._id}>
                      <img
                        src={comment?.user.avatar}
                        alt=""
                        className="w-8 h-8 object-cover  rounded-full"
                      />
                    </Link>

                    <div>
                      <p className=" font-medium text-sm lg:text-base">
                        {comment?.user.name}
                      </p>

                      <p className=" text-gray-500 text-sm lg:text-sm">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="hidden md:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </>
  );
};

export default Post;
