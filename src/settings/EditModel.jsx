import React, { useEffect, useState } from "react";
import Header from "../headerComponent/Header";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, Switch } from "@radix-ui/themes";
import { getModelWithTrimsApi } from "../services/allapis";
import TrimsTable from "./TrimsTable";
import { auth } from "../Firebase/firebaseConfig";

function EditModel() {
    const [theTrims, setTheTrims] = useState([]);
    const { modelname } = useParams();
    const { id } = useParams();
    useEffect(() => {
        getTrimsOfthisModel();
    }, []);
    
    const getTrimsOfthisModel = async () => {
        const userId = auth.currentUser?.uid;
        try {
            const result = await getModelWithTrimsApi(id, userId, modelname);
            setTheTrims(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="p-5 bg-gray-50 h-screen">
                <Link className="text-gray-800 font-medium text-sm flex gap-4 items-center mb-5" to={`/edit/${id}`}>
                    <ArrowLeft className="w-5 " />
                    <div className="lg:flex flex-col gap-2">
                        <h1 className="font-bold text-gray-700 text-2xl">Edit Model</h1>
                        <p className="text-gray-400">Update model Configuration and pricing</p>
                    </div>
                </Link>
                <Card>
                    <p className="text-sm font-medium text-gray-700">Model Name</p>
                    <div className="lg:w-1/1 w-full outline outline-gray-200 rounded-md py-1 my-2 px-2 focus:bg-gray-300 fond-semibold">
                        {modelname}
                    </div>
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
                    <Card>
                        <TrimsTable theTrims={theTrims} modelname={modelname} id={id} />
                    </Card>
                </Card>
            </div>
        </>
    );
}

export default EditModel;
