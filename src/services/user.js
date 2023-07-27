import { API } from "@/config/api"
import { http } from "@/config/http"

export const userService = {
    getProfile(id){
        return http.get(`${API}/user/${id}`)
    },
    register(data){
        return http.post(`${API}/register`, data)
    },
    updateProfile(id,data) {
        return http.post(`${API}/user/update/${id}`, data)
    },
    changePassword(id,data) {
        return http.put(`${API}/users/${id}/password`, data)
    },
    checkin(data) {
        return http.post(`${API}/checkin`, data)
    },
    checkout(data) {
        return http.post(`${API}/checkout`, data)
    },
    getCheckinByDay(id) {
        return http.get(`${API}/checkins/${id}`)
    },
    getCheckinByMonth(id) {
        return http.get(`${API}/checkins-in-month/${id}`)
    },
    deleteCheckin(id) {
        return http.get(`${API}/user/${id}/delete-checkins`)
    }
    
}