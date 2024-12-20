import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import ErrorCard from "./ErrorCard";
import axios from "axios";
import { fetchPosts } from "../redux/features/postSlice";
// import PhotoGrid from "./PhotoGrid";

const AddPostCard = ({ setAddPost }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [desc, setDesc] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadPhoto(ev) {
    const files = ev.target.files;

    let uploadFiles = [];

    // console.log(files.length);

    if (files.length > 4) {
      return setErrMsg("You can only add 4 photos");
    }

    for (let i = 0; i < files.length; i++) {
      uploadFiles.push(URL.createObjectURL(ev.target.files[i]));

      setSelectedImages((prev) => {
        return [...prev, ev.target.files[i]];
      });

      console.log(uploadFiles);
    }

    setAddedPhotos((prev) => {
      return [...prev, ...uploadFiles];
    });
  }

  function removePhoto(filename) {
    console.log({ link: filename });

    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);

    setSelectedImages((prev) =>
      prev.filter((file) => {
        console.log({ file });
        console.log(URL.createObjectURL(file));

        return URL.createObjectURL(file) !== filename;
      })
    );

    // console.log(uploadFiles);
    // console.log(addedPhotos);
  }
  // console.log(selectedImages.length);
  // console.log(addedPhotos.length);

  const numberOfPhotos = addedPhotos?.length;

  const addPost = async () => {
    setLoading(true);
    let uploadFiles = [];
    console.log(selectedImages);
    try {
      // const files = ev.target.files;
      const dataDoc = new FormData();

      for (let i = 0; i < selectedImages.length; i++) {
        dataDoc.append("file", selectedImages[i]);
        dataDoc.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        dataDoc.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        const res = await fetch(process.env.REACT_APP_CLOUD_URL, {
          method: "post",
          body: dataDoc,
        });

        const imageData = await res.json();

        uploadFiles.push(imageData.secure_url.toString());

        // console.log(uploadFiles);
      }

      const { data } = await axios.post("/api/v1/post", {
        desc,
        photo: uploadFiles,
      });

      console.log(data);
      dispatch(fetchPosts());
      setLoading(false);
      setAddPost(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setErrMsg(message);
      console.log(error);
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
  }, [desc]);

  return (
    <div className=" w-[90%] flex flex-col gap-2  lg:gap-4 mx-auto bg-white  rounded-md shadow-md p-4 lg:w-[35%]">
      <div className=" flex  items-center justify-between">
        <div className=" flex gap-2 items-center">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt=""
            className=" w-8  h-8 rounded-full object-cover"
          />
          <div className=" flex gap-1 items-center ">
            <p className=" font-medium text-sm lg:text-base">{user?.name}</p>

            {user?.verified && (
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
        </div>

        <button onClick={() => setAddPost(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 font-medium text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {errMsg && <ErrorCard message={errMsg} />}
      <div className=" w-full">
        <textarea
          ref={textareaRef}
          placeholder="Write something"
          value={desc}
          // rows={4}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-4 text-gray-800 https://novascores.com/league/bundesliga.82/werder-bremen-vs-bayer-04-leverkusen.19154611 rounded-lg focus:outline-none   transition duration-200 ease-in-out resize-none customScrollBar"
          // className=" p-2 w-full min-h-20 text-sm md:text-base bg-transparent outline-none  placeholder:font-light placeholder:text-gray-400"
        ></textarea>

        {numberOfPhotos === 1 && (
          <div className=" overflow-hidden h-72 rounded-lg">
            {addedPhotos.map((link, index) => (
              <div className=" h-full flex relative " key={index}>
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />
                <button
                  onClick={() => removePhoto(link)}
                  className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 lg:w-6 h-4 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {numberOfPhotos === 2 && (
          <div className=" grid grid-cols-2 gap-2 overflow-hidden rounded-lg">
            {addedPhotos.map((link, index) => (
              <div key={index} className=" h-32 flex relative ">
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />

                <button
                  onClick={() => removePhoto(link)}
                  className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 lg:w-6 h-4 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {numberOfPhotos === 3 && (
          <div className="grid gap-2  grid-cols-[2fr_1fr]  rounded-lg overflow-hidden ">
            <div className=" h-full flex relative ">
              <img
                className=" w-full h-full  object-cover "
                src={addedPhotos[0]}
                alt=""
              />
              <button
                onClick={() => removePhoto(addedPhotos[0])}
                className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 lg:w-6 h-4 lg:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className=" flex-1 h-full flex relative ">
                <img
                  className=" w-full h-full  object-cover "
                  src={addedPhotos[1]}
                  alt=""
                />
                <button
                  onClick={() => removePhoto(addedPhotos[1])}
                  className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 lg:w-6 h-4 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <div className=" flex-1 h-full flex relative ">
                <img
                  className=" w-full h-full  object-cover "
                  src={addedPhotos[2]}
                  alt=""
                />
                <button
                  onClick={() => removePhoto(addedPhotos[2])}
                  className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 lg:w-6 h-4 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        {numberOfPhotos === 4 && (
          <div className=" grid grid-cols-2  gap-2 overflow-hidden rounded-lg">
            {addedPhotos.map((link, index) => (
              <div key={index} className=" h-32 flex relative ">
                <img
                  className=" w-full h-full  object-cover "
                  src={link}
                  alt=""
                />
                {console.log(link)}
                <button
                  onClick={() => removePhoto(link)}
                  className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 lg:w-6 h-4 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className=" flex w-full justify-end">
        {(addedPhotos.length > 0 || desc) && (
          <button
            disabled={loading}
            onClick={addPost}
            className="bg-black disabled:opacity-50 text-white text-sm lg:text-base rounded-md w-fit px-4 py-2"
          >
            {loading ? "Uploading" : "Post"}
          </button>
        )}
      </div>

      <label className="flex h-16 w-16 cursor-pointer items-center justify-center border  rounded-md p-2   text-gray-500">
        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
        <span>
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
        </span>
      </label>
    </div>
  );
};

export default AddPostCard;
