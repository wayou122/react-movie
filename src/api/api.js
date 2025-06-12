export const API = 'http://localhost:8085/tiann'

export const loginAPI = `${API}/login`
export const registerAPI = `${API}/register`
export const logoutAPI = `${API}/logout`
export const checkLoginAPI = `${API}/check-login`
export const authcodeAPI = (time) => `${API}/authcode?time=${time}`

export const resetPasswordAPI = `${API}/reset-password`
export const forgetPasswordAPI = `${API}/forget-password`
export const accountAPI = `${API}/user/account`
export const updateUsernameAPI = `${API}/user/update-username`
export const updateAccountAPI = `${API}/user/update-account`
export const checkUsernameAPI = (newName, oldName) => `${API}/register/check-username?newUsername=${newName}&oldUsername=${oldName}`
export const checkEmailAPI = (email) => `${API}/register/check-email?email=${email}`

export const emailConfirmAPI = (email, token) => `${API}/register/email-confirm?email=${email}&token=${token}`

export const addReviewAPI = (movieId) => `${API}/user/review/${movieId}`
export const deleteReviewAPI = (reviewId) => `${API}/user/review/${reviewId}`
export const updateReviewAPI = (reviewId) => `${API}/user/review/${reviewId}`
export const toggleReviewReactionAPI = (id, reaction) => `${API}/user/review/reaction/${id}/${reaction}`

export const addToWatchlistAPI = (movieId) => `${API}/user/toggle-watchlist/movie/${movieId}`

export const movieAPI = `${API}/movie`
export const movieParamsAPI = (params) => `${API}/movie${params}`
export const movieIdAPI = (id) => `${API}/movie/${id}`
export const movieSearchAPI = `${API}/movie/search`
export const movieFilterAPI = `${API}/movie/filter`

export const watchlistAPI = `${API}/user/watchlist`
export const reviewAPI = (params) => `${API}/review${params}`

export const reviewerAPI = `${API}/reviewer`
export const reviewerNameAPI = (name, page) => `${API}/reviewer/${name}?page=${page}`

export const mapDataAPI = `${API}/map`
export const addMapDataAPI = `${API}/map`