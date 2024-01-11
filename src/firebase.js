import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "anketko-a749e.firebaseapp.com",
  projectId: "anketko-a749e",
  storageBucket: "anketko-a749e.appspot.com",
  messagingSenderId: "585297596629",
  appId: "1:585297596629:web:f85b28df70da61ebf5925c"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
