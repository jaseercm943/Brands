import { Card } from "@radix-ui/themes";
import { X, ChevronDown, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditColorCombination from "./EditColorCombination";

function EditTrim({modelDetails,setModelDetails,cards,setCards}) {
    
        const addCombination = () => {
            setCards([...cards, {intColor:"",extColor:""}]);
        };
  return (
    <>
    <div className="lg:flex justify-between mb-5">
                <p className="text-md font-medium text-gray-700">Add New Trim</p>
                <X className="w-4" />
            </div>
            <p className="text-sm font-medium">Trim Name</p>
            <input  type="text" value={modelDetails.TrimName} className="outline outline-gray-300 rounded-sm py-1 lg:w-1/1 w-full mt-2 px-2" onChange={(e)=>setModelDetails({...modelDetails,TrimName:e.target.value})}/>
            <div className="relative">
                <div className="lg:grid grid-cols-2 gap-5 my-6">
                    <div className="">
                        <p className="text-sm font-medium">Unit Price</p>
                        <input type="text" value={modelDetails.unitPrice} className="outline  outline-gray-300 rounded-sm py-1 lg:w-full px-2" onChange={(e)=>setModelDetails({...modelDetails,unitPrice:e.target.value})}/>
                    </div>

                    <div>
                        <p className="text-sm font-medium">Retail Price</p>
                        <input type="text" value={modelDetails.retailPrice} className="outline  outline-gray-300 rounded-sm py-1 lg:w-full px-2" onChange={(e)=>setModelDetails({...modelDetails,retailPrice:e.target.value})}/>
                    </div>
                </div>
                <div className="lg:grid grid-cols-2 gap-5">
                    <div>
                        <p className="text-sm font-medium">Drive Type</p>
                        <ChevronDown className="w-4 absolute lg:top-25.5 lg:left-206" />
                        <select value={modelDetails.driveType} className="outline outline-gray-300 rounded-sm py-2 text-[80%] appearance-none  lg:w-full px-2" onChange={(e)=>setModelDetails({...modelDetails,driveType:e.target.value})}>
                            <option value="" hidden>
                                Manual
                            </option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Fuel Type</p>
                        <ChevronDown className="w-4 absolute lg:top-25.5 lg:left-425" />
                        <select value={modelDetails.fuelType} className="outline outline-gray-300 rounded-sm py-2 text-[80%] appearance-none px-2 lg:w-full border-none" onChange={(e)=>setModelDetails({...modelDetails,fuelType:e.target.value})}>
                            <option value="" hidden>
                                Gas
                            </option>
                            <option value="Gas">Gas</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Petrol">Petrol</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="lg:flex items-center-safe justify-between lg:my-5">
                <div>
                    <p className="text-md font-bold text-gray-700">Color Combination</p>
                    <p className="text-[80%] font-light text-gray-400">Define Interior and Exterior color</p>
                </div>
                <button
                    className="text-gray-700 font-medium outline-gray-300 outline px-2 py-1 text-[80%] rounded-sm flex items-center-safe gap-2 cursor-pointer"
                    onClick={addCombination}
                >
                    <Plus className="w-3.5" />
                    Add Combination
                </button>
            </div>
            {cards.map((card,index) => (
                <Card className="bg-gray-100 my-2 p-4" key={index}>
                    <EditColorCombination index={index} card={card} cards={cards} setCards={setCards} modelDetails={modelDetails} setModelDetails={setModelDetails}/>
                </Card>
            ))}
    </>
  )
}

export default EditTrim