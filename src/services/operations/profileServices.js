import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { userApi } from "../apis";
import { logout } from "./authAPI";

const { GET_CURRENT_LOGGED_USER_API } = userApi;

export const getCurrentUser = async (token, dispatch, naviagte) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      GET_CURRENT_LOGGED_USER_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response.data.data);
    dispatch(setUser(response.data.data));
  } catch (error) {
    console.log(error?.response?.data?.error || error);
    toast.error("Could not get user details, Login Again");
    dispatch(logout(token, dispatch, naviagte));
    naviagte("/login");
  }

  setLoading(false);
};
