import { GiSeagull } from "react-icons/gi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorCard from "../components/ErrorCard";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/features/userSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg(false);

    const formData = {
      name,
      username,
      email,
      password,
    };

    try {
      const { data } = await axios.post("/api/v1/user/register", formData);

      dispatch(SET_USER(data));
      setLoading(false);
      navigate("/uploadPhoto");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setErrMsg(message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className=" flex gap-6 flex-col w-[90%] lg:w-[40%] my-20  mx-auto bg-white rounded-md shadow-md p-4 lg:p-8 "
      >
        <div className="flex items-center  gap-2">
          <div className=" bg-gray-50 p-2 rounded-md">
            <GiSeagull size={20} />
          </div>

          <h1 className=" font-semibold">Seagull</h1>
        </div>

        {errMsg && <ErrorCard message={errMsg} />}

        <div>
          <h1 className="font-bold text-2xl">Create account</h1>
          <p className="text-sm text-gray-500">
            Join our community and share event,we got you
          </p>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div>
              <label className="  text-sm" htmlFor="name">
                Name
              </label>
              <input
                className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <input
                className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <p className=" text-xs mt-1 text-gray-500">
            This will be your display name
          </p>
        </div>
        <div>
          <label className=" text-sm" htmlFor="email">
            Email
          </label>
          <input
            className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="  text-sm" htmlFor="password">
            Password
          </label>
          <input
            className=" border rounded-md p-2 w-full placeholder:text-sm placeholder:font-normal bg-gray-50"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className="bg-black flex justify-center items-center disabled:opacity-60 text-white rounded-md p-2.5 mt-6"
          type="submit"
        >
          {loading ? (
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
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
          ) : (
            "Register"
          )}
        </button>
        <Link className=" text-center" to={"/login"}>
          <p className=" text-xs mt-1 text-gray-500">
            Already have an account?{" "}
            <span className=" text-black font-semibold">Login</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
