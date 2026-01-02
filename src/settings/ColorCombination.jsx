import React, { useState } from "react";
import { X, ChevronDown, Plus, Trash2 } from "lucide-react";

function ColorCombination({ index, cards, setCards, modelDetails}) {
    

    const [intColors, setIntColors] = useState("");

    const [extColors, setExtColors] = useState("");

    const interior = (value) => {
        setIntColors(value);
        index.intColor=value
    };
    const exterior = (value) => {
        setExtColors(value);
        index.extColor=value
    };
    const removeColors = (index, cards) => {
        let Newcards = cards.filter((card) => card != index);
        setCards(Newcards);
    };
    return (
        <>
            <div className="lg:grid grid-cols-3  gap-5 my-3">
                <div>
                    <label className="text-xs font-medium">Interior Color</label>
                    <br />

                    <div className="relative">
                        <ChevronDown className="w-4 absolute lg:right-2 top-1" />
                        <select
                        
                            className="outline outline-gray-300 rounded-sm py-1.5 text-[70%] lg:w-full appearance-none px-2"
                            onChange={(e) => interior(e.target.value)}
                        >
                            <option value="" hidden>
                                Select Interior Color...
                            </option>
                            <option value="Red">Red</option>
                            <option value="Black">Black</option>
                            <option value="Gray">Gray</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium">Exterior Color</label> <br />
                    <div className="relative">
                        <ChevronDown className="w-4 absolute lg:top-4 lg:right-2 transform -translate-y-1/2" />
                        <select
                       
                            className="outline outline-gray-300 rounded-sm py-1.5 text-[70%] appearance-none px-2 lg:w-full"
                            onChange={(e) => exterior(e.target.value)}
                        >
                            <option value="" hidden>
                                Select Exterior Color...
                            </option>
                            <option value="Red">Red</option>
                            <option value="Black">Black</option>
                            <option value="Gray">Gray</option>
                        </select>
                    </div>
                </div>

                <div className="lg:flex items-center-safe justify-between">
                    <div className="lg:flex items-center-safe gap-2">
                        {intColors ? <p>{intColors}</p> : <p className="underline text-xs">No interior color</p>}
                        <Plus className="w-3" />
                        {extColors ? <p>{extColors}</p> : <p className="underline text-xs">No exterior color</p>}
                    </div>

                    <Trash2 className="w-4 text-red-600 cursor-pointer" onClick={() => removeColors(index, cards)} />
                </div>
            </div>
        </>
    );
}

export default ColorCombination;
