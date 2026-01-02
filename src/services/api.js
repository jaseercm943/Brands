import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
});

let isLoggingOut = false;

axiosInstance.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error);
        if (!error.response) {
            window.location.replace("/")
            return Promise.reject(error); // network error
        }
        const status = error.response.status;
        if ((status === 401 || status === 403) && !isLoggingOut) {
            isLoggingOut = true;
            try {
                toast.error("Session expired. Please login again.");
                await signOut(auth);
            } catch (err) {
                console.error("Sign out failed", err);
            } finally {
                setTimeout(() => {
                    window.location.replace("/");
                }, 1500);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
