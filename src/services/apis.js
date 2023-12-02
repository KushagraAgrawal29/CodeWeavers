const BASE_URL = process.env.REACT_APP_BASE_URL

//Categories api
export const categories = {
   CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const endpoints = {
   SENDOTP_API: BASE_URL + "/auth/sendOTP",
   SIGNUP_API: BASE_URL + "/auth/signup",
   LOGIN_API: BASE_URL + "/auth/login",
   RESETPASSSWORD_API: BASE_URL + "/auth/reset-password",
   RESETPASSTOKEN_API:BASE_URL + "/auth/reset-password-token", 
}