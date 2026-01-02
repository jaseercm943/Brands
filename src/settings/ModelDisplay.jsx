import React from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteTheModelApi } from "../services/allapis";

function ModelDisplay({ modelname, id, modelTrims, setDeletedResponse}) {
    const deleteModel = async (modelname) => {
        try {
            const deletedModel = await deleteTheModelApi(modelname);
            console.log(deletedModel);
            if (deletedModel.status == 200) {
                setDeletedResponse(deletedModel)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {" "}
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-l font-semibold">{modelname}</p>
                        <span className="text-[60%] bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Link to={`/edit/model/${modelname}/${id}`} className="icon-btn">
                            <SquarePen className="w-4" />
                        </Link>

                        <button
                            onClick={() => deleteModel(modelname)}
                            className="icon-btn text-red-600 hover:bg-red-100"
                        >
                            <Trash2 className="w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4">
                    {modelTrims
                        .filter((mt) => mt.modelName === modelname)
                        .map((mt) => (
                            <div key={mt.id}>
                                <div className="gap-5 my-5">
                                    {/* Trim details */}
                                    <div className="lg:w-1/2 rounded-md bg-gray-100 p-2 mt-3">
                                        <div className="flex justify-between">
                                            <p className="font-semibold">{mt.TrimName}</p>
                                            <div>
                                                <span className="text-[60%] bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                                                    Active
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-xs">
                                            <span className="font-medium">Unit Price</span>&nbsp;&nbsp;&nbsp;&nbsp;:
                                            {mt.unitPrice}
                                        </p>
                                        <p className="text-xs">
                                            <span className="font-medium">Retail Price</span> :{mt.retailPrice}
                                        </p>
                                        <p className="text-xs">
                                            <span className="font-medium mr-10">Fuel</span>:{mt.fuelType} +{" "}
                                            {mt.driveType}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default ModelDisplay;
