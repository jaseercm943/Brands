import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, LogOut, User } from "lucide-react";
import { Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import Header from "../headerComponent/Header";
import { addBrandApi } from "../services/allapis";
import { toast } from "react-toastify";
import { auth } from "../Firebase/firebaseConfig";

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

function Add() {
    const [data, setData] = useState({
        brandName: "",
        brandCode: "",
        deadlineTime: "",
        productionTime: "",
        shippingTime: "",
    });

    const addBrand = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            toast.error("Session expired. Please login again.");
            return;
        }

        if (!data.brandName || !data.brandCode || !data.productionTime || !data.shippingTime || !data.deadlineTime) {
            toast.error("Please fill all required fields");
            return;
        }


        try {
            const res = await addBrandApi({ data, userId: auth.currentUser.uid });

            if (res.status === 200) {
                toast.success("Brand added successfully");
                setData({
                    brandName: "",
                    brandCode: "",
                    deadlineTime: "",
                    productionTime: "",
                    shippingTime: "",
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to add brand");
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
                        <h1 className="font-bold text-gray-800 text-3xl">Add Brand Configuration</h1>
                        <p className="text-gray-400">Add the brand Configuration and timing settings</p>
                    </div>
                </div>

                <Card className="mt-5   bg-gray-100">
                    <div className="px-5 mb-5">
                        <p className="text-gray-800 font-semibold">{inputs[0].label}</p>
                        <input
                            value={data.brandName}
                            onChange={(e) => setData({ ...data, brandName: e.target.value })}
                            type="text"
                            className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 w-1/1  py-2"
                        />
                    </div>
                    <div className="pl-5 mr-5 mb-5">
                        <p className="text-gray-800 font-semibold">{inputs[1].label}</p>
                        <input
                            onChange={(e) => setData({ ...data, brandCode: e.target.value })}
                            type="text"
                            className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 w-1/1 py-2"
                            value={data.brandCode}
                        />
                    </div>
                    {/* The Flex Inputs Begin */}
                    <div className="lg:flex lg:flex-row mx-5 lg:gap-10 flex flex-col gap-5">
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[2].label}</p>
                            <input
                                value={data.deadlineTime}
                                onChange={(e) => setData({ ...data, deadlineTime: e.target.value })}
                                type="number"
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[2].description} </p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[3].label}</p>
                            <input
                                type="number"
                                value={data.productionTime}
                                onChange={(e) => setData({ ...data, productionTime: e.target.value })}
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[3].description}</p>
                        </div>
                        <div>
                            <p className="text-gray-800 font-semibold">{inputs[4].label}</p>
                            <input
                                value={data.shippingTime}
                                onChange={(e) => setData({ ...data, shippingTime: e.target.value })}
                                type="number"
                                className="outline-gray-200 outline rounded-md px-5 text-lg text-gray-700 lg:w-[545px] w-full py-2"
                            />
                            <p className="text-sm text-gray-500 font-medium mt-2">{inputs[4].description}</p>
                        </div>
                    </div>

                    <Card className="mt-5 lg:mx-5">
                        <h1 className="font-black text-gray-800">{inputs[5].label}</h1>
                        <div className="flex mt-3">
                            <h1 className="text-blue-500 font-black text-2xl">
                                {(Number(data.productionTime) || 0) + (Number(data.shippingTime) || 0)}
                            </h1>

                            <div className="ml-5 text-sm text-gray-500 font-medium">
                                <div>{inputs[5].description}</div>
                                <div>{inputs[5].description2}</div>
                            </div>
                        </div>
                    </Card>
                    <div className="border-t mt-5 border-t-gray-300 flex justify-end gap-3 py-5 mx-5">
                        <form action="">
                            <button className="bg-white px-4 py-2 border-gray-300 rounded-md border text-sm font-medium">
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 px-4 py-2 text-sm rounded-md text-white font-medium"
                                onClick={(e) => addBrand(e)}
                                type="submit"
                            >
                                Add Brand
                            </button>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Add;
