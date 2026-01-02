import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";


function Register() {
    const navigate=useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const signUp = async () => {
        if (!user.username || !user.email || !user.password) {
            setError("All fields are required!");
            return;
        } else if (user.username && user.email && user.password) {
            setError("")
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

                await updateProfile(userCredential.user, {
                    displayName: user.username,
                });
                
                navigate('/')
                toast.success("Welcome to Login")
                console.log("User Registered:", userCredential.user);
                
            } catch (err) {
                console.log(err);
                setError(err.message);
            }
        }
    };

    return (
        <>
            <div className="ml-150 mr-200 mt-50">
                <h1 className="text-3xl mb-5 font-black text-green-700">SignUp</h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="text-lg py-2 px-4 outline-1 rounded-md  text-zinc-600"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="text-lg py-2 px-4 outline-1 rounded-md  text-zinc-600"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="text-lg py-2 px-4 outline-1 rounded-md  text-zinc-600"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                {error && <p className="text-red-500 mt-3 font-medium">{error}</p>}

                <button
                    onClick={signUp}
                    className="outline rounded-md px-51 py-3 mt-5 cursor-pointer bg-green-900 text-white font-medium"
                >
                    SignUp
                </button>

                <p className="text-lg mt-3">
                    Already have an account?
                    <Link to="/" className="underline text-blue-600 ml-2">
                        LogIn
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Register;
