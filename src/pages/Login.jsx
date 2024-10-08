import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_USER } from "../redux/features/userSlice";
import ErrorCard from "../components/ErrorCard";
import { selectIsLoggedIn } from "../redux/features/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { username, password };

    try {
      const { data } = await axios.post("/api/v1/user/login", formData);

      dispatch(SET_USER(data));
      dispatch(SET_LOGIN(true));

      console.log(formData);

      navigate("/");
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

  if (selectIsLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" flex gap-6 flex-col lg:w-[25%] my-20  mx-auto bg-white rounded-md shadow-md p-4 "
      >
        <div>
          <h1 className="font-bold text-2xl">Login</h1>
          <p className="text-sm text-gray-500">
            Join our community and share event,we got you
          </p>
        </div>

        {errMsg && <ErrorCard message={errMsg} />}

        <div>
          <label className=" text-sm" htmlFor="username">
            Usermane
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
          type="submit"
          disabled={loading}
          className="bg-black disabled:opacity-60 text-white rounded-md p-2.5 mt-6"
        >
          Login
        </button>
        <Link className=" text-center" to={"/register"}>
          <p className=" text-xs mt-1 text-gray-500">
            Don&apos;t have an account?{" "}
            <span className=" text-black font-semibold">Register</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
