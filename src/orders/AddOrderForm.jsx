import React from "react";
import { Label } from "../ui/label";

function AddOrderForm({selectedBrand, handleBrandChange, selectedModel, handleModelChange, selectedTrim, trimSelected, allBrand, modelNames, trimNames,selectedColorComb, handleChangeColorComb, colorComb,quantity,setQuantity
}) {
    return (
        <>
            <div className="grid gap-1">
                <Label htmlFor="brand">Brand*</Label>
                <select
                    name="brand"
                    id="brand"
                    className="select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e)}
                >
                    <option value="" hidden>
                        Select Brand
                    </option>
                    {allBrand?.map((name, i) => (
                        <option value={name.id} key={name.id}>
                            {name.data.brandName}
                        </option>
                    ))}
                </select>
            </div>

            {/* MODEL */}
            <div className="grid gap-1">
                <Label htmlFor="model">Model Name*</Label>
                <select
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e)}
                    name="model"
                    id="model"
                    className="select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                >
                    <option value="" hidden>
                        Select Model
                    </option>
                    {modelNames?.map((model, i) => (
                        <option key={i} value={model.modelName}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-1">
                <Label htmlFor="trim">Trim Name*</Label>
                <select
                    name="trim"
                    id="trim"
                    value={selectedTrim}
                    onChange={(e) => trimSelected(e.target.value, selectedModel, selectedBrand)}
                    className={`${
                        !selectedModel && "text-gray-400"
                    } select-light-arrow bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1`}
                >
                    {selectedModel ? (
                        <option value="" hidden>
                            Select Trim
                        </option>
                    ) : (
                        <option value="" className="" hidden>
                            Select Model First*
                        </option>
                    )}
                    {trimNames?.map((trims, i) => (
                        <option value={trims} key={i}>
                            {trims}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-1">
                <Label htmlFor="cc">Color Combination*</Label>
                <select
                    name="cc"
                    id="cc"
                    value={selectedColorComb}
                    onChange={(e) => handleChangeColorComb(e)}
                    className="select-light-arrow text-gray-800 bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"
                >
                    <option value="" hidden>
                        Select Color Combination
                    </option>
                    {colorComb?.map((cc, i) => (
                        <option value={cc.intColor + cc.extColor} key={i}>
                            {cc.extColor} + {cc.intColor}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-1">
                <p className="font-medium text-[100%]">Quantity*</p>
                <input onChange={(e)=>setQuantity(e.target.value)} value={quantity} type="number" className="px-3 text-gray-800 bg-gray-100 outline-gray-400 outline rounded-sm w-full py-1"/>
            </div>
        </>
    );
}

export default AddOrderForm;
