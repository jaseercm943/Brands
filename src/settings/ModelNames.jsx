import React, { useEffect, useState } from "react";
import { getBrandModelApi } from "../services/allapis";

function ModelNames({ brandId,userId }) {
    const [modelNames, setModelNames] = useState([]);
    
    useEffect(() => {
        getModels()
    }, [brandId,userId]);

    const getModels = async () => {
        try {
            const result = await getBrandModelApi(brandId, userId);
            setModelNames([...new Set(result.data)]);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1 className="font-bold text-md">Available Models</h1>
            <div>
                {modelNames?.length >= 0 &&
                    modelNames?.map((names,i) => (
                        <button key={i} className="cursor-pointer rounded-full border bg-blue-500 text-white   px-3 text-sm font-medium">
                            {names}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default ModelNames;
