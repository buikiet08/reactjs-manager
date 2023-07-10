import { API } from "@/config/api"
import { http } from "@/config/http"

export const userService = {
    getProfile(id){
        return http.get(`${API}/user/${id}`)
    },
    register(data){
        return http.post(`${API}/register`, data)
    },
    updateProfile(data) {
        return http.patch(`${API}`, data)
    },
    changePassword(data) {
        return http.post(`${API}/change-password`, data)
    },
    
}