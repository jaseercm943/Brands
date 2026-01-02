import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";
import {
    addOrderApi,
    getBrandApi,
    getColorCombApi,
    getModelAndTrimsApi,
    getTrimsOfModelNameApi,
} from "../services/allapis";
import AddOrderForm from "./AddOrderForm";
import { auth } from "../Firebase/firebaseConfig";
import { toast } from "react-toastify";

function AddOrder() {
    const [open, setOpen] = useState(false);
    const [allBrand, setAllBrand] = useState([]);
    const [modelNames, setModelNames] = useState([]);
    const [trimNames, setTrimNames] = useState([]);
    const [colorComb, setColorComb] = useState([]);

    const [quantity, setQuantity] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedTrim, setSelectedTrim] = useState("");
    const [selectedColorComb, setselectedColorComb] = useState("");

    useEffect(() => {
        allBrands();
    }, []);

    // -------- FETCH BRANDS ----------
    const allBrands = async () => {
        const userId = auth.currentUser?.uid;
        try {
            const allBrands = await getBrandApi(userId);
            setAllBrand(allBrands.data);
        } catch (error) {
            console.log(error);
        }
    };

    // -------- FETCH MODELS WHEN BRAND SELECTED ----------
    const loadModels = async (brandId) => {
        const userId = auth.currentUser?.uid;
        try {
            const result = await getModelAndTrimsApi(brandId, userId);
            const models = result.data.map((m) => m.modelName);
            setModelNames([...new Set(models)]);
        } catch (error) {
            console.log(error);
        }
    };

    // -------- ON BRAND CHANGE ----------
    const handleBrandChange = (e) => {
        const selected = e.target.value;
        setSelectedBrand(selected);
        loadModels(selected);
    };
    // -------- ON MODEL CHANGE ----------
    const handleModelChange = (e) => {
        const selected = e.target.value;
        setSelectedModel(selected);
        loadTrims(selected);
    };
    // -------- FETCH TRIMS WHEN MODEL SELECTED ----------
    const loadTrims = async (selected) => {
        try {
            const result = await getTrimsOfModelNameApi(selected);
            setTrimNames(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    const trimSelected = async (trim, Model, BrandId) => {
        setSelectedTrim(trim);
        try {
            const response = await getColorCombApi(BrandId, Model, trim);
            const ColorComb = response.data.map((c) => c.colorComb);
            setColorComb(ColorComb.flat(Infinity));
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangeColorComb = (e) => {
        setselectedColorComb(e.target.value);
    };
    const addOrder = async () => {
        const userId = auth.currentUser?.uid;
        const order = { userId, selectedBrand, selectedModel, selectedTrim, selectedColorComb, quantity };
        if (selectedBrand && selectedModel && selectedTrim && selectedColorComb && quantity) {
            try {
                const addedOrder = await addOrderApi(order);
                addedOrder.status == 200 && toast.success("Order Placed Successfully");
                setOpen(false);
                setSelectedBrand("");
                setSelectedModel("");
                setSelectedTrim("");
                setselectedColorComb("");
                setQuantity("");
                setModelNames([]);
                setTrimNames([]);
                setColorComb([]);
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("ENTER ALL FIELDS");
        }
    };
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="bg-blue-600 text-white cursor-pointer">
                        <Plus className="w-4" />
                        New Order
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-sm">Create New Order</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                <Card className="w-full border-gray-300 bg-white shadow-none">
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            <Plus className="w-4" />
                                            {/* ADD ORDER FORM COMPONENT */}
                                            <AddOrderForm
                                                selectedBrand={selectedBrand}
                                                handleBrandChange={handleBrandChange}
                                                allBrand={allBrand}
                                                selectedModel={selectedModel}
                                                handleModelChange={handleModelChange}
                                                modelNames={modelNames}
                                                selectedTrim={selectedTrim}
                                                trimSelected={trimSelected}
                                                trimNames={trimNames}
                                                selectedColorComb={selectedColorComb}
                                                handleChangeColorComb={handleChangeColorComb}
                                                colorComb={colorComb}
                                                setselectedColorComb={setselectedColorComb}
                                                quantity={quantity}
                                                setQuantity={setQuantity}
                                            />
                                            <AlertDialogFooter className={"grid grid-cols-1"}>
                                                <Button
                                                    onClick={addOrder}
                                                    className="cursor-pointer text-[120%] font-semibold gap-2 w-full text-green-500 border border-green-500"
                                                >
                                                    <Plus />
                                                    Add item to Order
                                                </Button>

                                                <AlertDialogCancel className="cursor-pointer bg-white text-red-600 font-semibold text-[120%] border-red-600 border w-full">
                                                    Cancel
                                                </AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default AddOrder;
