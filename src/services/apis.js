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
   POST_LOGOUT_USER_API: BASE_URL + "/auth/logout",
   PUT_CHANGE_PASSWORD_API: BASE_URL + '/auth/changepassword',
}

export const contactApi = {
   POST_CONTACT_US: BASE_URL + "/contact/contactus"
}

export const userApi = {
   PUT_CHANGE_AVATAR_API: BASE_URL + '/users/changeavatar',
   GET_CURRENT_LOGGED_USER_API: BASE_URL + '/users/currentuser',
   DELETE_DELETE_CURRENT_USER_API: BASE_URL + '/users/deleteCurrentUser',
   GET_GET_ENROLLED_COURSES_API: BASE_URL + '/users/getEnrolledCourses',
}

export const profileApi = {
   PUT_UPDATE_PROFILE_API: BASE_URL + '/profiles ',
}

export const courseApi = {
   POST_CREATE_COURSE_API: BASE_URL + '/courses',
   PUT_EDIT_COURSE_API: BASE_URL + '/courses/editcourse',
}

export const sectionApi = {
   POST_CREATE_SECTION_API: BASE_URL + '/createSection',
   PUT_UPDATE_SECTION_API: BASE_URL + '/updateSection',
}