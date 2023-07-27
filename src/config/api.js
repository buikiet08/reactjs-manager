export const API = import.meta.env.VITE_API
export const API_DEFAULT = import.meta.env.VITE_DEFAULT
export const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
export const urlFile = (file) => {
    return `${API_DEFAULT}/images/${file}`
}