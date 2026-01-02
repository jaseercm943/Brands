import React, { useEffect, useState } from "react";
import Header from "../headerComponent/Header";
import { useParams } from "react-router-dom";
import { Card, Switch } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import AddTrim from "../settings/AddTrim";
import EditTrim from "../settings/EditTrim";
import { editModelAndTrimApi, getTheTrimtoEditApi } from "../services/allapis";
import TrimsTable from "../settings/TrimsTable";
import { auth } from "../Firebase/firebaseConfig";

function EditModelandTrim() {
    const { modelname, id, trimName } = useParams();
    const [newModelName,setNewModelName]=useState("")
    const [modelDetails, setModelDetails] = useState({
        modelName: "",
        TrimName: "",
        unitPrice: 0,
        retailPrice: 0,
        driveType: "",
        fuelType: "",
        colorComb: "",
    });
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        getTheTrimDetails();
    }, []);

    const getTheTrimDetails = async () => {
        try {
            const theTrimtoEdit = await getTheTrimtoEditApi(id, modelname, trimName);
            setModelDetails(theTrimtoEdit.data);
            setCards(theTrimtoEdit.data.colorComb);
        } catch (err) {
            console.log(err);
        }
    };
    const updateModelAndTrim = async () => {
        const userId = auth.currentUser?.uid;
        try {
            const updatedData = await editModelAndTrimApi(
                id,
                trimName,
                modelname,
                userId,
                { ...modelDetails, colorComb: cards }
            );
            if (updatedData.status == 200) {
                toast.success(updatedData.data.message);
                const nm=updatedData.data.docRef2._fieldsProto.modelName 
                setNewModelName(nm.stringValue)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Header />
            <div className="p-5 bg-gray-50 h-screen">
                <Link
                    className="text-gray-800 font-medium text-sm flex gap-4 items-center mb-5"
                    to={`/edit/model/${newModelName || modelname}/${id}`}
                >
                    <ArrowLeft className="w-5 " />
                    <div className="lg:flex flex-col gap-2">
                        <h1 className="font-bold text-gray-700 text-2xl">Edit Trim</h1>
                        <p className="text-gray-400"> Configuration a new model and Trim for this brand</p>
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
                            <EditTrim
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
                                className="bg-blue-600 px-4 py-2 text-sm rounded-md text-white font-medium"
                                onClick={updateModelAndTrim}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default EditModelandTrim;
