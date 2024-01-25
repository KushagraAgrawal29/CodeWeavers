import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactApi } from "../apis";

export const ContactUs = async(contactData,setLoading,reset) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector('POST',contactApi.POST_CONTACT_US,contactData);
        console.log("SEND CONTACT US RESPONSE",response);
        toast.success("Contact Details Sent");

        reset({
            firstName:"",
            lastName:"",
            email:"",
            phoneNo:"",
            message:"",
        })
    }
    catch(error){
        toast.error(error?.response?.data?.error || 'Contact failed')
    }
    toast.dismiss(toastId);
    setLoading(false);
}