import React, { useEffect } from "react";
import { Calendar, Factory, Settings2, SquarePen, Trash2, Truck } from "lucide-react";
import ModelNames from "./ModelNames";
import { Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig";



function AllBrandsDisplay({ brands,deleteBrand }) {
    const userId=auth.currentUser?.uid
    return (
        <>
            <Card className="ml-7 mr-7 mt-6 bg-white">
                <div className="flex items-center-safe justify-between mx-5">
                    <h1 className="font-bold text-xl flex items-center ">
                        <Settings2 className="w-5 mr-2" />
                        {brands.data.brandName}-{brands.data.brandCode}
                    </h1>
                    <div className="flex gap-3">
                        <Link
                            to={`/edit/${brands.id}`}
                            className=" cursor-pointer border-gray-500 bg-gray-100 pl-3 pr-3 pt-1.5 pb-1 flex rounded-md text-sm items-center gap-1  text-gray-700"
                        >
                            Edit
                            <SquarePen className="w-3 mr-2" />
                        </Link>
                        <button
                            onClick={() => deleteBrand(brands.id)}
                            className=" cursor-pointer border-gray-500 bg-gray-100 pl-3 pr-3 pt-1.5 pb-1 flex rounded-md text-sm items-center gap-1 text-gray-700"
                        >
                            Delete
                            <Trash2 className="w-3 mr-2" />
                        </button>
                    </div>
                </div>
                <div className="flex mt-5">
                    <Card className="bg-red-200 lg:w-110  mx-5 ">
                        <h1 className="text-orange-500 font-semibold flex text-md">
                            <Calendar className="w-4 mr-2" />
                            Order Deadline
                        </h1>
                        <h1 className="text-2xl font-bold">{brands.data.deadlineTime}</h1>
                        <p className="text-gray-500 text-[90%]">days of month</p>
                        <p className="text-gray-500 text-[80%]">Next word</p>
                    </Card>
                    <Card className="bg-blue-200 lg:w-110  mx-5">
                        <h1 className="text-blue-400 font-semibold flex text-md">
                            <Factory className="w-4 mr-2" />
                            Production
                        </h1>
                        <h1 className="text-2xl font-bold">{brands.data.productionTime}</h1>
                        <p className="text-gray-500 text-[90%]">days of month</p>
                        <p className="text-gray-500 text-[80%]">Next word</p>
                    </Card>
                    <Card className="bg-blue-200 lg:w-110  mx-5">
                        <h1 className="text-blue-400 font-semibold flex text-md">
                            <Truck className="w-4 mr-2" />
                            Shipping
                        </h1>
                        <h1 className="text-2xl font-bold">{brands.data.shippingTime}</h1>
                        <p className="text-gray-500 text-[90%]">days of month</p>
                        <p className="text-gray-500 text-[80%]">Next word</p>
                    </Card>
                    <Card className="bg-green-300 lg:w-110  mx-5">
                        <h1 className="text-green-500 font-semibold flex text-md">
                            <Settings2 className="w-4 mr-2" />
                            Total Lead Time
                        </h1>
                        <h1 className="text-2xl font-bold">
                            {Number(brands.data.productionTime) + Number(brands.data.shippingTime)}
                        </h1>
                        <p className="text-gray-500 text-[90%]">days of month</p>
                        <p className="text-gray-500 text-[80%]">Next word</p>
                    </Card>
                </div>

                <div className="mt-4 mx-5">
                    <ModelNames brandId={brands.id} userId={userId} />
                </div>
            </Card>
        </>
    );
}

export default AllBrandsDisplay;
