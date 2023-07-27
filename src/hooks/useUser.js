import { useSelector } from "react-redux"

export const useUser = () => useSelector(store => store.user)