import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Images = ({ post, setShowAllPhotos }) => {
  return (
    <div className="fixed z-50 inset-0 w-full h-screen overflow-y-auto bg-black">
      <div className="w-full h-full  mx-auto mb-16  p-4 lg:p-10 ">
        <div className="flex justify-between mb-4 items-center">
          <Link to={"/profile/" + post?.user?._id}>
            <div className=" flex items-center gap-4">
              <img
                src={post?.user.avatar}
                alt=""
                className="w-10 h-10 object-cover  rounded-full"
              />

              <div>
                <div className=" flex  items-start gap-2">
                  <p className=" text-gray-50 font-medium text-sm lg:text-base">
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
                </div>
                <p className=" text-gray-100 text-xs lg:text-sm">
                  posted{" "}
                  {formatDistanceToNow(post?.createdAt, {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setShowAllPhotos(false)}
            className=" text-xs bg-white flex gap-1 items-center py-2 px-4 rounded-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lg:w-6 w-4 lg:h-6 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Close
          </button>
        </div>
        {/* className=" flex gap-4 m-auto overflow-x-scroll md:w-[50%]
        lg:customScrollBarX " */}
        <div className=" lg:w-[50%] mx-auto">
          <p className=" text-sm my-3 text-gray-400 text-pretty ">
            {post?.desc}
          </p>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {post.photo.length > 0 &&
              post.photo.map((photo, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img
                      className=" w-full  max-h-96   rounded-lg shadow-sm object-cover"
                      src={photo}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Images;
