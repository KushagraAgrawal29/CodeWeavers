import toast from "react-hot-toast"
import { authApi } from "../apis"
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSSWORD_API,
} = authApi

export const sendOTP = async (email,dispatch,navigate) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try{
        const response = await apiConnector("POST",SENDOTP_API,{
            email,
            checkUserPresent:true
        })
        console.log("SENDOTP API RESPONSE......",response);
        console.log(response.data.success);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("OTP sent successfully");
        navigate("/verify-email");
    }
    catch(error){
        console.log("SENDOTP API ERROR.........",error);
        toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});
            console.log("RESET PASSWORD TOKEN RESPONSE.....",response);

            if(!response.data.message){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN ERROR");
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(passowrd,confirmPassowrd,token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSSWORD_API,{passowrd,confirmPassowrd,token});

            console.log("RESET PASSWORD RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password have been reset successfully");
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN ERROR",error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}

export function login (email,password){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })

            console.log("LOGIN API RESPONSE.........",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
        }
        catch(error){
            console.log("LOGIN API ERROR..........",error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };   
};

export const signUp = async (signUpData,dispatch,navigate) => {
    dispatch(setLoading(true));
    const toastId = toast.loading('Loading...');

    try{
        const response = await apiConnector('POST',SIGNUP_API,signUpData);

        toast.success("Sign Up Successful");
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem('token',JSON.stringify(response.data.token));
        navigate('/dashboard/my-profile')
    }
    catch(error){
        toast.error(error?.response?.data?.error || "Sign Up Failed");
        navigate("/signup")
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
}