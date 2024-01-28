import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userApi } from "../apis";

const { GET_GET_ENROLLED_COURSES_API } = userApi();

export const getEnrolledCourses = async(token,setEnrolledCourses,dispatch,navigate) => {
    const toastId = toast.loading("Loading...");
    
    try{
        const response = await apiConnector("GET",GET_GET_ENROLLED_COURSES_API,null,{
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_GET_ENROLLED_COURSES_API response",response.data);
        toast.success("Enrolled Courses Data Fetched Sucessfully");
        setEnrolledCourses(response.data.data);
    }
    catch(error){
        toast.error(error?.response?.data?.error || 'Fetch Failed');
    }
    toast.dismiss(toastId);
};