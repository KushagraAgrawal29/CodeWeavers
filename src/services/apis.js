const BASE_URL = process.env.REACT_APP_BASE_URL

//Categories api
export const categories = {
   CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const authApi = {
   SENDOTP_API: BASE_URL + "/auth/sendOTP",
   SIGNUP_API: BASE_URL + "/auth/signup",
   LOGIN_API: BASE_URL + "/auth/login",
   RESETPASSSWORD_API: BASE_URL + "/auth/reset-password",
   RESETPASSTOKEN_API:BASE_URL + "/auth/reset-password-token", 
   POST_LOGOUT_USER_API: BASE_URL + "/auth/logout"
}

export const contactApi = {
   POST_CONTACT_US: BASE_URL + "/contact/contactus"
}