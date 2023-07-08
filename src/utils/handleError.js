import { message } from "antd"

export const handleError = (err) => {
    console.error(err)
    if(err?.error) {
        message.error(err?.error)
    }
}