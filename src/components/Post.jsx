import React from "react";
// import Comments from "./Comments";

const Post = () => {
  return (
    <div className=" flex flex-col gap-4">
      <div className=" flex items-start justify-between">
        <div className=" flex items-center gap-4">
          <div>
            <img
              src={
                "https://images.pexels.com/photos/18582529/pexels-photo-18582529/free-photo-of-a-man-is-working-on-a-statue-in-a-workshop.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              }
              alt=""
              className="w-10 h-10 object-cover  rounded-full"
            />
          </div>

          <div>
            <div className=" flex  items-center gap-2">
              <p className=" font-medium text-sm lg:text-base">Jack Dorsey</p>
              <p className=" text-gray-500 text-xs lg:text-sm">@Jacky_D</p>
            </div>
            <p className=" text-gray-500 text-xs lg:text-sm">17m</p>
          </div>
        </div>

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
      </div>
      <p className=" text-sm">
        I really want to be the best, so i will put in the work and i leave the
        rest for God because there's no one better.Thank you Lord
      </p>
      <div className=" flex flex-col gap-4">
        <div>
          <img
            src={
              "https://images.pexels.com/photos/26926247/pexels-photo-26926247/free-photo-of-closeness.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
            className="object-cover w-full min-h-96 rounded-md"
          />
        </div>
      </div>
      {/* interaction */}
      <div className=" flex items-center text-sm justify-between my-2.5">
        <div className="flex gap-4 md:gap-6 lg:gap-8 ">
          <div className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 lg:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </div>
            <span className=" text-gray-300">|</span>
            <span className=" text-sm lg:text-base text-gray-500">
              39 <span className=" hidden md:inline">Likes</span>
            </span>
          </div>
          <div className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 lg:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
            </div>
            <span className=" text-gray-300">|</span>
            <span className=" text-sm lg:text-base text-gray-500">
              300 <span className=" hidden md:inline">Comments</span>
            </span>
          </div>
        </div>

        <div className=" flex items-center gap-2 lg:gap-4 bg-gray-50 p-2 rounded-xl">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 lg:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
              />
            </svg>
          </div>
          <span className=" text-gray-300">|</span>
          <span className=" text-sm lg:text-base text-gray-500">
            100 <span className=" hidden md:inline">Repost</span>
          </span>
        </div>
      </div>
      {/* comment */}
      {/* <Comments /> */}
    </div>
  );
};

export default Post;
