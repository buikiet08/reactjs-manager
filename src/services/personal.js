import { API } from "@/config/api"
import { http } from "@/config/http"

export const personalService = {
    getAllPersonal(query = '', signal) {
        return http.get(`${API}/get-all-user${query}`, signal)
    },
    getPersonal(id) {
        return http.get(`${API}/info-user/${id}`)
    },
    getPersonalByTeam(id) {
        return http.get(`${API}/get-user-by-team`, id)
    },
    getListPersonalByTeam() {
        return http.get(`${API}/users/count-by-team`)
    },
    getPersonalNew() {
        return http.get(`${API}/users/recently-created`)
    },
    getCheckinPersonalByTime(id,month,year) {
        return http.get(`${API}/users/${id}/${month}/${year}`)
    }
}