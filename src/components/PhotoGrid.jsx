import React from "react";

const PhotoGrid = ({ photos }) => {
  const numberOfPhotos = photos?.length;

  if (numberOfPhotos) {
    return (
      <div>
        {numberOfPhotos === 1 && (
          <div className=" overflow-hidden min-h-96 rounded-lg">
            {photos.map((link, index) => (
              <div className=" h-full flex relative " key={index}>
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
        {numberOfPhotos === 2 && (
          <div className=" grid grid-cols-2 gap-2 overflow-hidden rounded-lg">
            {photos.map((link, index) => (
              <div key={index} className=" h-48 flex  ">
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
        {numberOfPhotos === 3 && (
          <div className="grid gap-2  grid-cols-[2fr_1fr]  rounded-lg overflow-hidden ">
            <div className=" h-full flex relative ">
              <img
                className=" w-full h-full  object-cover "
                src={photos[0]}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className=" flex-1 h-full flex ">
                <img
                  className=" w-full h-full  object-cover "
                  src={photos[1]}
                  alt=""
                />
              </div>
              <div className=" flex-1 h-full flex ">
                <img
                  className=" w-full h-full  object-cover "
                  src={photos[2]}
                  alt=""
                />
              </div>
            </div>
          </div>
        )}
        {numberOfPhotos === 4 && (
          <div className=" grid grid-cols-2  gap-2 overflow-hidden rounded-lg">
            {photos.map((link, index) => (
              <div key={index} className=" h-48 flex ">
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default PhotoGrid;
