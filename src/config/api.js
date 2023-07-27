export const API = import.meta.env.VITE_API
export const avatarDefault = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
export const urlFile = (file) => {
    return `http://localhost:3001/images/${file}`
}