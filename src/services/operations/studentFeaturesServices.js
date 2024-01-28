import toast from "react-hot-toast";

export const getEnrolledCourses = async(token,setEnrolledCourses,dispatch,navigate) => {
    try{

    }
    catch(error){
        toast.error(error?.response?.data?.error || 'Fetch Failed');
    }
}