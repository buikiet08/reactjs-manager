import { API } from "@/config/api"
import { http } from "@/config/http"

export const reportService = {
    getReportTeams() {
        return http.get(`${API}/report-teams`)
    },
    rangerCheckins() {
        return http.get(`${API}/users/ranger-user-checkins`)
    }
}