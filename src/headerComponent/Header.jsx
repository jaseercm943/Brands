import React, { useState, useEffect } from "react";
import { Car, ChartColumn, Database, HomeIcon, NotepadText, Settings, Truck, Upload } from "lucide-react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const data = [
    { name: "Dashboard", icon: <HomeIcon className="w-4 h-4" />, to: "/dashboard" },
    { name: "Inventory", icon: <Database className="w-4 h-4" />, to: "/inventory" },
    { name: "Vehicle Detail", icon: <Car className="w-4 h-4" />, to: "/vehicle" },
    { name: "Forecasting", icon: <ChartColumn className="w-4 h-4" />, to: "/forecasting" },
    { name: "Analytics", icon: <TrendingUpIcon className="w-4 h-4" />, to: "/analytics" },
    { name: "Shipping", icon: <Truck className="w-4 h-4" />, to: "/shipping" },
    { name: "Orders", icon: <NotepadText className="w-4 h-4" />, to: "/orders" },
    { name: "Import", icon: <Upload className="w-4 h-4" />, to: "/import" },
    { name: "Settings", icon: <Settings className="w-4 h-4" />, to: "/home" },
];

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selected, setSelected] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");

    // Sync selected tab with URL
    useEffect(() => {
        const current = data.find((item) => item.to === location.pathname);
        if (current) setSelected(current.name);
    }, [location.pathname]);

    // Load user safely
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email || "");
                setUserName(user.displayName || "");
            } else {
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const logout = () => {
        auth.signOut()
        toast.success("Logged Out");
        navigate("/");
    };

    return (
        <>
            <div className="flex justify-between px-5 py-1 border-b border-gray-300">
                <img
                    src="https://www.shutterstock.com/image-vector/car-logo-combine-letter-c-600nw-2652292057.jpg"
                    width="50"
                    alt="Logo"
                    className="rounded-full cursor-pointer"
                />
                <div className="flex gap-2 items-center">
                    <User className="rounded-full w-10 h-10 bg-gray-100 p-2" />
                    <div>
                        <h1>{userEmail}</h1>
                        <button className="border-green-800 text-green-800 rounded-full border px-3 text-[70%]">
                            {userName}
                        </button>
                    </div>
                    <ChevronDown className="w-4 ml-5" />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <LogOut
                                className="rounded-full w-10 h-10 border-gray-500 border p-2 ml-5 cursor-pointer"
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>You Wish to Logout?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={'cursor-pointer'}>NO</AlertDialogCancel>
                                <AlertDialogAction onClick={logout} className={'cursor-pointer'}>YES</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <header className="bg-white border-b border-gray-300">
                <nav className="flex lg:pl-8 overflow-x-auto">
                    {data.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className={`h-9 min-w-fit pt-2 px-4 font-semibold flex gap-1 text-[85%] whitespace-nowrap
                                ${selected === item.name ? "bg-green-100 border-b-4 border-green-700" : ""}`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}

export default Header;
