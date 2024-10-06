import React from "react";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { selectIsLoggedIn } from "../redux/features/authSlice";

const Private = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //   const isLoggedIn = useSelector(selectIsLoggedIn);

 console.log(user)

  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default Private;
