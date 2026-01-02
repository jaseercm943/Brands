import { ArrowLeft, X, Plus, ChevronDown, Trash, Trash2 } from "lucide-react";
import Header from "../headerComponent/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Switch } from "@radix-ui/themes";
import { colors, Stack } from "@mui/material";
import AddTrim from "../settings/AddTrim";
import { addModelForBrandApi, getBrandApi, getModelAndTrimsApi } from "../services/allapis";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebaseConfig";


const getHeaders = async () => {
    const user = auth.currentUser;
    if (!user) {
        toast.error("Session expired. Please login again.");
        return;
    }
    const idtoken = await user.getIdToken();
    return { Authorization: `Bearer ${idtoken}` };
};

function AddModel() {
    const [typingModelStatus, setTypingModelStatus] = useState(false);
    const [cards, setCards] = useState([]);
    const { brandId } = useParams();
    // const user = JSON.parse(sessionStorage.getItem("userDetails"));
    // const userId = user.user.uid;
    const userId = auth.currentUser?.uid;

    const [modelDetails, setModelDetails] = useState({
        modelName: "",
        TrimName: "",
        unitPrice: "",
        retailPrice:"",
        driveType: "",
        fuelType: "",
        colorComb: [],
    });
    useEffect(() => {
        if (!modelDetails.modelName.trim()) {
            setTypingModelStatus(false);
            return;
        }
        const timer = setTimeout(() => {
            fetchModels();
        }, 400);
        return () => clearTimeout(timer);
    }, [modelDetails.modelName]);

    const fetchModels = React.useCallback(async () => {
        if (!auth.currentUser) return;
        const headers = await getHeaders();
        if (!headers) return;
        const response = await getModelAndTrimsApi(brandId, userId, headers);
        const allModels = response?.data
        setTypingModelStatus(allModels.some((m) => m.modelName.toLowerCase() === modelDetails.modelName.toLowerCase()));
    }, [brandId, userId, modelDetails.modelName]);

    const addModelToBrand = async () => {
        const { modelName, TrimName, unitPrice, retailPrice, driveType, fuelType, colorComb } = modelDetails;
        const idtoken = await auth.currentUser.getIdToken();
        const reqHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idtoken}`,
        };
        if (modelName && TrimName && unitPrice >= 0 && retailPrice >= 0 && driveType && fuelType && cards.length > 0) {
            try {
                const addedModelToTheBrand = await addModelForBrandApi(
                    { ...modelDetails, colorComb: cards, brandId, userId },
                    reqHeader
                );
                if (addedModelToTheBrand.status == 200) {
                    toast.success("Added Your Model Successfully");
                    setCards([]);
                    setModelDetails({
                        modelName: "",
                        TrimName: "",
                        unitPrice: "",
                        retailPrice: "",
                        driveType: "",
                        fuelType: "",
                        colorComb: [],
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Enter All Details For The Model");
        }
    };

    return (
        <div>
            <Header />
            <div className="p-5 bg-gray-50 h-screen">
                <Link
                    className="text-gray-800 font-medium text-sm flex gap-4 items-center mb-5"
                    to={`/edit/${brandId}`}
                >
                    <ArrowLeft className="w-5 " />
                    <div className="lg:flex flex-col gap-2">
                        <h1 className="font-bold text-gray-700 text-2xl">Add New Model</h1>
                        <p className="text-gray-400"> Configuration a new model for this brand</p>
                    </div>
                </Link>

                <Card className="px-5 ">
                    <p className="text-sm font-medium text-gray-700">Model Name</p>
                    <input
                        value={modelDetails.modelName}
                        onChange={(e) => setModelDetails({ ...modelDetails, modelName: e.target.value })}
                        type="text"
                        name=""
                        id=""
                        className="lg:w-1/1 w-full outline outline-gray-200 rounded-md py-1 my-2 px-2 focus:bg-gray-300 fond-semibold"
                    />
                    {typingModelStatus && <p className="text-red-600 font-medium text-sm">Model Name Already Exists</p>}
                    <div className="lg:flex flex-row gap-2 items-center-safe">
                        <Switch size="1" defaultChecked />
                        <div>
                            <h1 className="font-medium text-gray-800 text-[80%]">Active</h1>
                            <p className="text-gray-400 text-[75%]">Active models are available for ordering</p>
                        </div>
                    </div>
                    <div className="border-b-gray-200 border-b my-5"></div>
                    <div className="lg:flex items-center-safe justify-between">
                        <div>
                            <p className="text-md font-bold text-gray-700">Model Trims</p>
                            <p className="text-[80%] font-light text-gray-400">
                                Configure different trims levels for this model
                            </p>
                        </div>
                        <button className="text-gray-700 font-medium outline-gray-300 outline px-2 py-1 text-[80%] rounded-sm cursor-pointer">
                            Add New Trim
                        </button>
                    </div>
                    <Card className="bg-gray-100">
                        <Card>
                            <AddTrim
                                modelDetails={modelDetails}
                                setModelDetails={setModelDetails}
                                cards={cards}
                                setCards={setCards}
                            />
                        </Card>
                    </Card>
                    <div className="lg:flex lg:flex-row justify-between my-5">
                        <div className="lg:flex flex-row gap-2 items-center-safe ">
                            <Switch size="1" defaultChecked />
                            <div>
                                <h1 className="font-medium text-gray-800 text-[80%]">Active</h1>
                                <p className="text-gray-400 text-[75%]">Active trims are available for ordering</p>
                            </div>
                        </div>
                        <div className="lg:flex flex-row gap-2 items-center-safe ">
                            <button className="bg-white px-4 py-2 border-gray-300 rounded-md border text-sm font-medium">
                                Cancel
                            </button>
                            <button
                                disabled={typingModelStatus}
                                className={`px-4 py-2 text-sm rounded-md text-white font-medium cursor-pointer
                                ${typingModelStatus ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"}`}
                                onClick={addModelToBrand}
                            >
                                Add Trim
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default AddModel;
