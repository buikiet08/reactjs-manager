import { API } from "@/config/api"
import { http } from "@/config/http"

export const authService = {
    login(data) {
        return http.post(`${API}/login`,data)
    },
    register(data) {
        return http.post(`${API}/register`, data)
    }
    // refreshToken(data) {
    //     return http.post(`${AUTHENTICATION_API}/refresh-token`, data)
    // }
}