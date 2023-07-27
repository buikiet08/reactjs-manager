import { authService } from "@/services/auth"
import axios from "axios"
import { clearCheckins, clearCheckout, clearToken, clearUser, getToken, setToken } from "../utils/token"
import { message } from "antd"

export const http = axios.create()
http.interceptors.response.use((res) => {

    return res.data
}, async (error) => {
    try {
        
        if (error.response.status === 403 && error.response.data.error === "jwt expired") {
            // refresh token
            // const token = getToken()
            // const res = await authService.refreshToken({
            //     refreshToken: token.refreshToken
            // })
            // gắn token vào localStorage
            // setToken(res.data)
            clearToken()
            clearUser()
            clearCheckins()
            clearCheckout()
            // Hiển thị thông báo cho người dùng
            message.error('Đã hết phiên đăng nhập, vui lòng đăng nhập lại')
            // Chuyển hướng đến trang đăng nhập
            setTimeout(() => {
                window.location.href = '/login';
            }, 500)
            // Thực thi lại api bị lỗi
            return
        }
        return Promise.reject(error);
    } catch (err) {

    }
    throw error
})


http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }
    return config
})