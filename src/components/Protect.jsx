import React from "react";

const ShowOnLogin = ({ children }) => {
  const isActive = true;

  if (isActive) {
    return <>{children}</>;
  }

  return null;
};

export const ShowOnLogOut = ({ children }) => {
  const isActive = true;

  if (!isActive) {
    return <>{children}</>;
  }

  return null;
};

export default ShowOnLogin;
