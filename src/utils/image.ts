const { VITE_FIREBASE_STORAGE_URL } = import.meta.env

export const getImageUrl = (name = "", parentName = "") =>
  `${VITE_FIREBASE_STORAGE_URL}/${parentName}%2F${name}?alt=media`
