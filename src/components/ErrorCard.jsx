import React from "react";

const ErrorCard = ({ message }) => {
  return (
    <div className=" bg-red-50 border border-red-500 text-red-500 text-xs p-2 text-center rounded-md">
      {message}
    </div>
  );
};

export default ErrorCard;
