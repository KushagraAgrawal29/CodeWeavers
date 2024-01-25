import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ route }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Navigate to={"/dashboard/my-profile"} /> : route;
};

export default PublicRoute;
