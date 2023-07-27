import { message } from "antd"

export const handleError = (err) => {
    console.error(err)
    if(err?.error || err?.response?.data?.error) {
        message.error(err?.error || err?.response?.data?.error)
    }
}