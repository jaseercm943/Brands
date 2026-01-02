import {Route, Routes, Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Edit from "./settings/Edit";
import Add from "./settings/Add";
import AddModel from "./settings/AddModel";
import EditModel from "./settings/EditModel";
import EditModelandTrim from "./settings/EditModelandTrim";
import Settings from "./Pages/Settings";
import Dashboard from "./Pages/Dashboard";
import Orders from "./Pages/Orders";
import Inventory from "./Pages/Inventory";
import ProtectedRoute from "./ProtectedRoute";
import VehicleDetail from "./Pages/VehicleDetail";
import Analytics from "./Pages/Analytics";
import Forecasting from "./Pages/Forecasting";
import Import from "./Pages/Import";
import Shipping from "./Pages/Shipping";


function App() {
    return (
        <>
            
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vehicle" element={<VehicleDetail />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/forecasting" element={<Forecasting />} />
                    <Route path="/import" element={<Import />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/home" element={<Settings />} />

                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/add/model/:brandId" element={<AddModel />} />
                    <Route path="/edit/model/:modelname/:id" element={<EditModel />} />
                    <Route
                        path="/edit/modelandTrims/:modelname/:id/:trimName"
                        element={<EditModelandTrim />}
                    />
                </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
        </>
    );
}

export default App;
