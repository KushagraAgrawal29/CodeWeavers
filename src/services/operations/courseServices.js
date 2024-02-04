import toast from "react-hot-toast";
import apiConnector from "../apiconnector";
import { categories, courseApi } from "../apis";

const { POST_CREATE_COURSE_API, PUT_EDIT_COURSE_API } = courseApi;

const { CATEGORIES_API } = categories;

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

export const editCourseDetails = async (
  formData,
  token,
  dispatch,
  navigate
) => {
  let result = null;

  const toastId = toast.loading("Loading");
  try {
    const response = await apiConnector("PUT", PUT_EDIT_COURSE_API, formData, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    console.log(response.data);
    result = response.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Cannot edit course,Try again");
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async (dispatch,navigate) => {
    let result = [];
    try{
        const response = await apiConnector("GET",CATEGORIES_API);
        console.log(response?.data?.data);
        result = response.data?.data;
    }
    catch(error){
        toast.error("Could not get course categories,try again");
    }
    return result;
}
