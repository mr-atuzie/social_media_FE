import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = { username, password };

      console.log(formData);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" flex gap-6 flex-col lg:w-[40%] my-20  mx-auto bg-white rounded-md shadow-md p-4 lg:p-8 "
      >
        {/* <div className="flex items-center  gap-2">
          <div className=" bg-gray-50 p-2 rounded-md">
            <GiSeagull size={20} />
          </div>

          <h1 className=" font-semibold">Seagull</h1>
        </div> */}
        <div>
          <h1 className="font-bold text-2xl">Login</h1>
          <p className="text-sm text-gray-500">
            Join our community and share event,we got you
          </p>
        </div>

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
