
export const API = 'http://localhost:8085/tiann'

export const loginAPI = `${API}/login`
export const registerAPI = `${API}/register`
export const logoutAPI = `${API}/logout`
export const checkLoginAPI = `${API}/check-login`
export const checkUsernameAPI = (newName, oldName) => `${API}/user/check-username?newUsername=${newName}&oldUsername=${oldName}`
export const authcodeAPI = (time) => `${API}/authcode?time=${time}`

export const accountAPI = `${API}/user/account`
export const updateUsernameAPI = `${API}/user/update-username`

export const movieAPI = `${API}/movie`
export const movieIdAPI = (id) => `${API}/movie/${id}`

export const reviewAPI = `${API}/review`

export const reviewerAPI = `${API}/reviewer`
export const reviewerNameAPI = (name) => `${API}/reviewer/${name}`