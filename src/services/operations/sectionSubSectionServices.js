import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { sectionApi } from "../apis";

const { POST_CREATE_SECTION_API,PUT_UPDATE_SECTION_API } = sectionApi;

export const updateSection = async (formData,token) => {
    let result = null;

    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("PUT",PUT_UPDATE_SECTION_API,formData,{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        });

        result = response.data?.data;
        toast.success("Course Section updated");
    }
    catch(error){
        toast.error(error?.response?.data?.error || "Cannot fetch Course, Try Again");
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async(formData,token) => {
    let result = null;

    const toastId = toast.loading("Loading....");

    try{
        const response = await apiConnector("POST",POST_CREATE_SECTION_API,formData,{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        });

        result = response.data?.data;

        toast.success("Course Section Created");
    }
    catch(error){
        toast.error(error?.response?.data?.error || 'Cannot fetch course, Try Again')
    }
    toast.dismiss(toastId);
    return result;
}