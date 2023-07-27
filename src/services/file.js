import { API } from "@/config/api"
import { http } from "@/config/http"

export const fileService = {
    uploadFile (id,file) {
        const formData = new FormData()
        formData.set('avatar', file)
        return http.put(`${API}/users/${id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}