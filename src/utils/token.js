const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const PERSONAL_KEY = 'checkin'
const CHECK_OUT = 'checkout'
const DELETE_CHECKINS = 'deleteCheckins'
export const setToken = (data) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}
export const getToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}
// user

export const setUser = (data) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export const getUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY)) 
}
export const clearUser = () => {
    localStorage.removeItem(USER_KEY)
}
// checkin
export const setCheckins = (data) => {
    localStorage.setItem(PERSONAL_KEY, JSON.stringify(data))
}
export const getCheckins = () => {
    return JSON.parse(localStorage.getItem(PERSONAL_KEY)) 
}
export const clearCheckins = () => {
    localStorage.removeItem(PERSONAL_KEY)
}
// checkout
export const setCheckout = (data) => {
    localStorage.setItem(CHECK_OUT, JSON.stringify(data))
}
export const getCheckout = () => {
    return JSON.parse(localStorage.getItem(CHECK_OUT)) 
}
export const clearCheckout = () => {
    localStorage.removeItem(CHECK_OUT)
}
// check delete checkin
export const setDeleteCheckins = (data) => {
    localStorage.setItem(DELETE_CHECKINS, JSON.stringify(data))
}
export const getDeleteCheckins = () => {
    return JSON.parse(localStorage.getItem(DELETE_CHECKINS)) 
}
export const clearDeleteCheckins = () => {
    localStorage.removeItem(DELETE_CHECKINS)
}