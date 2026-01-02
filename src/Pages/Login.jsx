import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.error("Enter all fields");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      toast.success(`Welcome ${credential.user.displayName || "User"}`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Sign in to your account</p>
      </div>
      <form onSubmit={signIn}>
        <div className="mb-5 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="text-lg w-full py-2 px-3 outline outline-gray-300 rounded-md focus:outline-blue-500 transition-all"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="text-lg w-full py-2 px-3 outline outline-gray-300 rounded-md focus:outline-blue-500 transition-all"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="rounded-md w-full py-3 bg-green-900 text-white font-medium hover:bg-green-800 transition-colors"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-gray-600 mt-5">
        Don't have an account?
        <Link to="/register" className="underline text-blue-600 ml-2 font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
