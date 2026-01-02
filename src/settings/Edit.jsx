import { Button, Card } from "@radix-ui/themes";
import Header from "../headerComponent/Header";
import { ArrowLeft, ChevronDown, LogOut, User, Settings2, SquarePen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModelDisplay from "./ModelDisplay";
import { editTheBrandApi, getBrandModelApi, getModelAndTrimsApi, TheBrandApi } from "../services/allapis";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebaseConfig";
const buttons = [
    { icon: <SquarePen className="w-4 " />, name: "Edit" },
    { icon: <Trash2 className="w-4 " />, name: "Trash" },
];

const inputs = [
    { label: "Brand Name", description: "" },
    { label: "Brand Code", description: "" },
    { label: "Order Deadline", description: "Months and Days " },
    { label: "Production Time", description: "Days from Order to Production Completion" },
    { label: "Shipping Time", description: "Days from Production" },
    {
        label: "Total Lead Time",
        description: "Days from Production To Delivery",
        description2: "Production days + Shipping days",
    },
];
const buttuns = [{ icon: <SquarePen className="w-4 " /> }, { icon: <Trash2 className="w-4 " /> }];

function Edit() {
    const { id } = useParams();
    const [deletedResponse,setDeletedResponse]=useState({})
    const [modelTrims, setModelTrims] = useState([]);
    const [modelNames, setModelNames] = useState([]);
    const [data, setData] = useState({
        brandName: "",
        brandCode: "",
        deadlineTime: "",
        productionTime: "",
        shippingTime: "",
    });
    const userId = auth.currentUser?.uid;
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                getTheBrand();
                getModels();
                getModelsTrim();
            }
        });
        return () => unsub();
    }, [deletedResponse]);

    const getTheBrand = async () => {
        try {
            const theBrand = await TheBrandApi(id);
            setData(theBrand.data);
        } catch (error) {
            console.log(error);
        }
    };

    const editTheBrand = async () => {
        try {
            const editedDoc = await editTheBrandApi(id, data);
            if (editedDoc.status == 200) {
                toast.success("Updated the Brand Successfully");
                getTheBrand();
                getModels();
                getModelsTrim();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getModels = async () => {
        try {
            const result = await getBrandModelApi(id, userId);
            setModelNames([...new Set(result.data)]);
        } catch (error) {
            console.log(error);
        }
    };

    const getModelsTrim = async () => {
        try {
            const result = await getModelAndTrimsApi(id, userId);
            setModelTrims(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Header />
            <div className="px-10 py-5 bg-gray-100">
                <div>
                    <Link className="text-gray-800 font-medium text-sm flex items-center-safe" to={"/home"}>
                        <ArrowLeft className="w-5 mr-3" />
                        Back to Brands
                    </Link>
                    <div className="mt-5">
                        <h1 className="font-bold text-gray-800 text-2xl">Edit Brand Configuration</h1>
                        <p className="text-gray-400">Edit the brand Configuration and timing settings</p>
                    </div>
                </div>

                <Card className="mt-5  bg-gray-100">
                    <div className="px-5 mb-5">
                        <p className="text-gray-800 font-semibold">{inputs[0].label}</p>
                        <input
                            onChange={(e) => setData({ ...data, brandName: e.target.value })}
                            value={data?.brandName}
                            type="text"
                            className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 w-1/1  py-2"
                        />
                    </div>
                    <div className="px-5  mb-5">
                        <p className="text-gray-800 font-semibold">{inputs[1].label}</p>
                        <input
                            onChange={(e) => setData({ ...data, brandCode: e.target.value })}
                            value={data?.brandCode}
                            type="text"
                            className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 w-1/1 py-2"
                        />
                    </div>
                    {/* The Flex Inputs Begin */}
                    <div className="lg:flex lg:flex-row mx-5 lg:gap-10 flex flex-col gap-5">
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[2].label}</p>
                            <input
                                onChange={(e) => setData({ ...data, deadlineTime: e.target.value })}
                                value={data?.deadlineTime}
                                type="text"
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[2].description} </p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[3].label}</p>
                            <input
                                onChange={(e) => setData({ ...data, productionTime: e.target.value })}
                                value={data?.productionTime}
                                type="text"
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[3].description}</p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[4].label}</p>
                            <input
                                onChange={(e) => setData({ ...data, shippingTime: e.target.value })}
                                value={data?.shippingTime}
                                type="text"
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[4].description}</p>
                        </div>
                    </div>

                    <Card className="mt-5 lg:mx-5">
                        <h1 className="font-black text-gray-800">{inputs[5].label}</h1>
                        <div className="flex mt-3">
                            <h1 className="text-blue-500 font-black text-2xl">
                                {Number(data?.productionTime) + Number(data.shippingTime)}
                            </h1>
                            <div className="ml-5">
                                <p className="text-sm text-gray-500 font-medium">
                                    {inputs[5].description} <br />
                                    {inputs[5].description2}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <div className="border-t mt-5 border-t-gray-300 flex justify-end gap-3 py-5 mx-5">
                        <button className="bg-white px-4 py-2 border-gray-300 rounded-md border text-sm font-medium">
                            Cancel
                        </button>
                        <button
                            className="bg-blue-600 px-4 py-2 text-sm rounded-md text-white font-medium"
                            onClick={editTheBrand}
                        >
                            Edit Brand
                        </button>
                    </div>
                </Card>

                {/* Model adding */}
                <Card className="my-3">
                    <div className="flex justify-between items-center px-5 ">
                        <div>
                            <h1 className="font-bold text-gray-800 text-[120%]">Brand Models</h1>
                            <p className="text-gray-400 text-sm">Manage models and variants for this brand</p>
                        </div>

                        <Link
                            className="bg-blue-600 px-2 py-2 text-sm rounded-md text-white font-medium cursor-pointer"
                            to={`/add/model/${id}`}
                        >
                            <span className="mx-1 text-[100%] font-bold">+</span>
                            <span className="text-[100%] font-medium">Add Model</span>
                        </Link>
                    </div>
                    {/* model display */}
                    {modelNames?.length>0&&
                     modelNames?.map((names, i) => (
                        <Card key={i} className="mx-5 mt-6 bg-white">
                            <ModelDisplay
                                setDeletedResponse={setDeletedResponse}
                                modelname={names}
                                id={id}
                                userId={userId}
                                modelTrims={modelTrims}
                            />
                        </Card>))}
                </Card>
            </div>
        </>
    );
}

export default Edit;
