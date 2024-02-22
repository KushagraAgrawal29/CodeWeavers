import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { sectionApi, subSectionApi } from "../apis";

const { POST_CREATE_SECTION_API,PUT_UPDATE_SECTION_API,DELETE_DELETE_SECTION_API } = sectionApi;
const { DELETE_DELETE_SUBSECTION_API } = subSectionApi;

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
};

export const deleteSection = async (formData, token) => {
    let result = null;

    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("DELETE",DELETE_DELETE_SECTION_API,formData,{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        });

        result = response?.data?.data;
        toast.success("Course Section Deleted");
    }   
    catch(error){
        toast.error(error?.response?.data?.error || 'Cannot fetch course, Try Again');
    }
    toast.dismiss(toastId);
    return result;
};

export const deleteSubSection = async(formData,token) => {
    let result = null;

    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("DELETE",DELETE_DELETE_SUBSECTION_API,formData,{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        });

        result = response?.data?.data;
        toast.success("Lecture Deleted");
    }
    catch(error){
        toast.error(error?.response?.data?.error || 'Cannot fetch course, Try Again');
    }
    toast.dismiss(toastId);
    return result;
}