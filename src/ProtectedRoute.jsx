import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {  
            setUser(firebaseUser);
            setLoading(false);
        });
        return ()=> unsubscribe();
    }, []);

    if (loading) {
       return <div className="flex justify-center items-center h-screen text-2xl font-medium">Loading...</div>;
    }
    if(!user){
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
