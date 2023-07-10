import { API } from "@/config/api"
import { http } from "@/config/http"

export const personalService = {
    getAllPersonal(query = '', signal) {
        return http.get(`${API}/get-all-user${query}`, signal)
    },
    getPersonal(id,signal) {
        return http.get(`${API}/user/${id}`, signal)
    }
}