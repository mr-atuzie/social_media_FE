import React from "react";

const PostLoader = ({ single }) => {
  const loaders = [1, 2, 3];
  return (
    <div className=" p-4 shadow-md bg-white rounded-lg mb-4 flex flex-col gap-3 lg:gap-6">
      {single ? (
        <div className=" flex flex-col gap-2 lg:gap-4">
          <div className=" flex items-center gap-4">
            <div className="w-12 h-12 object-cover bg-gray-200  rounded-full"></div>

            <div className=" flex-1  ">
              <div className=" bg-gray-200 w-full p-2  mb-1 "></div>
              <div className=" bg-gray-200 w-[30%] p-2"></div>
            </div>
          </div>

          <div className=" bg-gray-200 w-full h-80 p-2 rounded-lg"></div>
        </div>
      ) : (
        <div>
          {loaders.map((loader) => (
            <div key={loader}>
              <div className=" flex flex-col gap-2 lg:gap-4">
                <div className=" flex items-center gap-4">
                  <div className="w-12 h-12 object-cover bg-gray-200  rounded-full"></div>

                  <div className=" flex-1  ">
                    <div className=" bg-gray-200 w-full p-2  mb-1 "></div>
                    <div className=" bg-gray-200 w-[30%] p-2"></div>
                  </div>
                </div>

                <div className=" bg-gray-200 w-full h-80 p-2 rounded-lg"></div>
              </div>

              <hr className=" border-t  border-gray-100 w-[85%] self-center" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostLoader;
