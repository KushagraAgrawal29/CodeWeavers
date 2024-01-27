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

export const userApi = {
   PUT_CHANGE_AVATAR_API: BASE_URL + '/users/changeavatar',
   GET_CURRENT_LOGGED_USER_API: BASE_URL + '/users/currentuser',
}

export const profileApi = {
   PUT_UPDATE_PROFILE_API: BASE_URL + '/profiles ',
}