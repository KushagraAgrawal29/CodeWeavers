import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileApi, userApi } from "../apis";
import { getCurrentUser } from "./profileServices";
import { setUser } from "../../slices/profileSlice";

const { PUT_CHANGE_AVATAR_API } = userApi;
const { PUT_UPDATE_PROFILE_API } = profileApi;

export const changeAvatar = async (
  token,
  formData,
  setLoading,
  dispatch,
  navigate
) => {
  const toastId = toast.loading("Updating...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "PUT",
      PUT_CHANGE_AVATAR_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(response?.data);
    toast.success("Profile Picture updated successfully");
    getCurrentUser(token, dispatch, navigate);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Upload Failed");
  }
  setLoading(false);
  toast.dismiss(toastId);
};

export const updateProfile = async (
  token,
  updateData,
  setLoading,
  dispatch,
  naviagte
) => {
  const toastId = toast.loading("Loading");
  setLoading(true);

  try {
    const response = await apiConnector(
      "PUT",
      PUT_UPDATE_PROFILE_API,
      updateData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(response.data);
    toast.success("Profile Updated Successfully");
    setUser(response.data);
  } catch (error) {
    toast.error(error?.response?.data?.error || "Update Failed");
  }
  setLoading(false);
  toast.dismiss(toastId);
};
