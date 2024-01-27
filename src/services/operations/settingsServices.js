import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userApi } from "../apis";
import { getCurrentUser } from "./profileServices";

const { PUT_CHANGE_AVATAR_API } = userApi;

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
