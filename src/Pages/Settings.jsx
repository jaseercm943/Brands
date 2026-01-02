import React, { useEffect, useState } from "react";
import Header from "../headerComponent/Header";
import { ArrowDownUp, ChevronDown, Search, ChevronUp } from "lucide-react";
import { Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { deleteTheBrandApi, getBrandApi, getBrandPerPageApi } from "../services/allapis";
import { auth } from "../Firebase/firebaseConfig";
import AllBrandsDisplay from "../settings/AllBrandsDisplay";
import { Spinner } from "../ui/spinner";


function Settings() {
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState([]);
    const [allBrands, setAllBrands] = useState([]); 
    const [perPage, setPerPage] = useState(5);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                loadAllBrands();
                loadPaginatedBrands();
            }else {
                setLoading(false);
            }
        });
        return unsub;
    }, [perPage]);
    
    const loadAllBrands = async () => {
        try {
            const uid = auth.currentUser?.uid;
            const result = await getBrandApi(uid);
            setAllBrands(result.data);
        } catch (err) {
            console.log(err);
        }
    };
    const loadPaginatedBrands = async () => {
        if (!perPage || perPage < 1) return;

        setLoading(true);
        try {
            const uid = auth.currentUser?.uid;
            const response = await getBrandPerPageApi(perPage, uid);
            setAllData(response.data);
        } catch (err) {
            console.log("Pagination failed", err);
        } finally {
            setLoading(false);
        }
    };
    const pageUp = async () => {
        if (perPage < allBrands?.length) setPerPage(perPage + 1);
    };
    const pageDown = async () => {
        if (perPage > 1) setPerPage(perPage - 1);
    };
    const deleteBrand = async (brandId) => {
        try {
            await deleteTheBrandApi(brandId);
            await loadAllBrands();
            await loadPaginatedBrands();
        } catch (err) {
            console.log(err);
        }
    };

    // const sorting = () => {};
    const searchInput = (e) => {
        const query = e.toLowerCase();
        if(!query){
            loadPaginatedBrands()
        }else{
            const searchedBrand = allBrands.filter(brand => brand.data.brandName.toLowerCase().includes(query));
            setAllData(searchedBrand);
        }
    };
    return (
        <div>
            <Header />
            <div className="bg-gray-50 py-6 lg:min-h-screen">
                <div className="flex justify-between items-center px-7 ">
                    <div>
                        <h1 className="font-bold text-gray-800 text-3xl">Brand Configuration</h1>
                        <p className="text-gray-400">Configure lead times and deadlines for each manufacturer</p>
                    </div>
                    {/* Adding Brand */}
                    <Link
                        className="cursor-pointer rounded-md border bg-blue-500 text-white pl-4 pt-1.5 pb-1.5 pr-4"
                        to={"/add"}
                    >
                        <span className="mr-3 text-[120%] font-bold">+</span>
                        <span className="text-[90%] font-bold">Add Brand</span>
                    </Link>
                </div>

                <Card className="  mt-5 lg:mx-7  rounded-md bg-white pb-5">
                    <div className="flex relative">
                        <Search className="text-gray-400 absolute top-2 left-6 w-4 " />
                        <input
                            onChange={(e) => searchInput(e.target.value)}
                            type="text"
                            className=" bg-gray-100 lg:ml-3 outline outline-gray-300 rounded-md py-2 lg:pl-10 placeholder:text-sm lg:w-367 focus:outline-3 focus:outline-red-200"
                            placeholder="Search brands and models...."
                        />
                        <div className="flex items-center">
                            <span className="ml-5 mr-2">Sort by: </span>
                            <button
                                // onClick={sorting}
                                className="cursor-pointer outline outline-gray-300 bg-gray-100 px-3 py-1.5 flex rounded-md text-sm items-center-safe  text-gray-700"
                            >
                                Name <ArrowDownUp className="w-4 ml-2" />
                            </button>
                        </div>
                        <button className="cursor-pointer outline outline-gray-300 bg-gray-100 px-4 text-sm rounded-md ml-4 text-gray-700">
                            Created
                        </button>
                    </div>
                    <div className="lg:flex flex-row justify-between mt-5 lg:mx-3 ">
                        <div className="text-gray-500 text-[90%] ">
                            Showing {allData?.length || 0} of {allBrands?.length || 0} brands
                        </div>
                        <div className="flex items-center justify-end lg:mr-1 relative">
                            Per page:
                            <input
                                type="number"
                                onChange={(e) => setPerPage(Number(e.target.value))}
                                value={perPage}
                                className="px-2 focus:border-gray-300 lg:w-1/4 appearence-none outline outline-gray-300 bg-gray-100  pt-2 pb-1 flex items-center-safe rounded-md ml-2 text-[90%] text-gray-700 cursor-pointer"
                            />
                            <ChevronUp
                                className="w-3.5 text-gray-500 absolute lg:right-2 lg:bottom-3 cursor-pointer"
                                onClick={pageUp}
                            />
                            <ChevronDown
                                className="w-3.5 text-gray-500 absolute lg:right-2 lg:top-3.5 cursor-pointer"
                                onClick={pageDown}
                            />
                        </div>
                    </div>
                </Card>

                {loading ? (
                    <Spinner className="text-center my-60 mx-230 h-19" />
                ) : allBrands.length === 0 ? (
                    <div className="text-center text-red-600 font-semibold text-2xl my-20">No brands added yet</div>
                ) : allData.length === 0 ? (
                    <div className="text-center  text-red-600 font-semibold text-2xl my-20">No results found</div>
                ) : (
                    allData.map((brands) => (
                        <AllBrandsDisplay key={brands.id} brands={brands} deleteBrand={deleteBrand} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Settings;
