import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCDD5z8aTKsTLIfix4_T0lAJX086IfJs2M",
  authDomain: "auth-4db98.firebaseapp.com",
  projectId: "auth-4db98",
  storageBucket: "auth-4db98.appspot.com",
  messagingSenderId: "130054509219",
  appId: "1:130054509219:web:16e19d682c91e372a66516",
  measurementId: "G-6B03K94B88",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
