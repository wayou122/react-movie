export const API = 'http://localhost:8085/tiann'

export const loginAPI = `${API}/login`
export const registerAPI = `${API}/register`
export const logoutAPI = `${API}/logout`
export const checkLoginAPI = `${API}/check-login`
export const authcodeAPI = (time) => `${API}/authcode?time=${time}`

export const accountAPI = `${API}/user/account`
export const updateUsernameAPI = `${API}/user/update-username`
export const checkUsernameAPI = (newName, oldName) => `${API}/register/check-username?newUsername=${newName}&oldUsername=${oldName}`

export const addReviewAPI = (movieId) => `${API}/user/review/${movieId}`
export const deleteReviewAPI = (reviewId) => `${API}/user/review/${reviewId}`
export const updateReviewAPI = `${API}/user/review`
export const updateReviewLikeAPI = (id, sentiment) => `${API}/user/review/sentiment/${id}/${sentiment}`

export const addToWatchlistAPI = (movieId) => `${API}/user/toggle-watchlist/movie/${movieId}`

export const movieAPI = `${API}/movie`
export const movieIdAPI = (id) => `${API}/movie/${id}`
export const movieSearchAPI = `${API}/movie/search`
export const movieFilterAPI = `${API}/movie/filter`

export const reviewAPI = `${API}/review`

export const reviewerAPI = `${API}/reviewer`
export const reviewerNameAPI = (name) => `${API}/reviewer/${name}`