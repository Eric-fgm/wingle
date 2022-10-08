import { FirebaseOptions, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const {
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_BUCKET_URL,
} = import.meta.env

const firebaseConfig: FirebaseOptions = {
  projectId: VITE_FIREBASE_PROJECT_ID,
  apiKey: VITE_FIREBASE_API_KEY,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
  storageBucket: VITE_FIREBASE_BUCKET_URL,
}

const firebase = initializeApp(firebaseConfig)

export const firestore = getFirestore(firebase)

export const storage = getStorage(firebase)

export const auth = getAuth(firebase)

export default firebase
