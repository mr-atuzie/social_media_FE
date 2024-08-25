import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSinglePost,
  selectPost,
  selectPostLoader,
} from "../redux/features/postSlice";

import PostLoader from "../components/PostLoader";
import RightMenu from "../components/RightMenu";
import LeftMenu from "../components/LeftMenu";
import PostCard from "../components/Post";
import Comments from "../components/Comments";

const Post = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const loader = useSelector(selectPostLoader);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  console.log(post);

  if (loader) {
    <PostLoader />;
  }

  return (
    <div className=" flex gap-6 pt-6">
      <div className="hidden lg:block w-[25%]">
        <LeftMenu />
      </div>
      <div className="w-full p-4 rounded-lg bg-white md:w-[70%] lg:w-[45%]">
        <div className="  flex-col gap-6 flex">
          <PostCard post={post} />
          <Comments post={post} />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default Post;
