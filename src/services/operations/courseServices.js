import toast from "react-hot-toast";
import apiConnector from "../apiconnector";
import { courseApi } from "../apis";

const { POST_CREATE_COURSE_API } = courseApi;

export const addCourse = async (formData, token, dispatch, navigate) => {
  let result = null;

  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      POST_CREATE_COURSE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(response.data);
    result = response.data?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error || "Cannot create course, Try Again"
    );
  }
  toast.dismiss(toastId);
  return result;
};
