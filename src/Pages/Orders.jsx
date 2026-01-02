import React, { useEffect } from "react";
import Header from "../headerComponent/Header";
import {
    ArrowLeft,
    Download,
    DollarSign,
    Filter,
    Search,
    Eye,
    StickyNote,
    Scissors,
} from "lucide-react";
import { Card } from "@radix-ui/themes";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AddOrder from "../orders/AddOrder";


function Orders() {
    const statuses = ["All Statuses", "Pending", "Completed", "Cancelled"];
    const [activeTab, setActiveTab] = useState("active");
   
    const tabs = [
        { id: "active", label: "Active Orders", count: 8 },
        { id: "historic", label: "Historic Orders", count: 4 },
        { id: "cancelled", label: "Cancelled Orders", count: 1 },
    ];
    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-screen">
                <div className="flex justify-between mx-5 items-center">
                    <div className="my-5">
                        <h1 className="font-bold text-gray-700 text-xl">Orders & Reservations</h1>
                        <p className="text-gray-500">Track customer ordrers and capital requirements</p>
                    </div>
                    <div className="text-[80%] flex gap-2 ">
                        <button className="border-gray-300 px-5 font-semibold py-1 border rounded-sm flex items-center gap-5">
                            <Download className="w-4" />
                            Export
                        </button>

                        <AddOrder/>
                    </div>
                </div>

                <Card className=" mx-5 my-5">
                    <div className="flex justify-between ">
                        <div className="my-2 px-1">
                            <p className="text-gray-500 text-[80%] font-semibold">Total Capital Required</p>
                            <p className="text-blue-600 font-bold text-[140%]">$746,700</p>
                            <p className="text-gray-500 text-[70%] font-medium">
                                Across 9 pending orders(44 pending units)
                            </p>
                        </div>

                        <DollarSign className="text-gray-500 mt-4" />
                    </div>
                </Card>

                <Card className="mx-5 ">
                    <div className="flex gap-2 px-2">
                        <Filter className="w-3.5 " />
                        <p className="font-bold text-md mt-0.5">Filters</p>
                    </div>
                    <div className="flex justify-between gap-5 px-2 items-center">
                        <div className="relative w-full">
                            <Search className="absolute w-4 mx-1 text-gray-600 top-1" />
                            <input
                                type="search"
                                className="bg-gray-100 w-1/1 outline-gray-200 outline rounded-sm px-8 py-1 text-gray-500"
                            />
                        </div>
                        <div className="relative inline-block">
                            <Select>
                                <SelectTrigger className="w-[180px] text-gray-600">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent className={"text-gray-600"}>
                                    <SelectGroup>
                                        <SelectLabel hidden>All Statuses</SelectLabel>
                                        <SelectItem value="Invoiced">Invoiced</SelectItem>
                                        <SelectItem value="Ordered">Ordered</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>
                <div className="flex items-center gap- bg-blue-50 px-4 py-2 rounded-lg mx-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`cursor-pointer
                            px-3 py-1  text-sm font-medium transition-all
                            ${activeTab === tab.id ? "bg-white text-gray-600 shadow-md" : "text-gray-500 bg-gray-200"}
                            `}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                <Card className="mx-5 my-5">
                    <h1>Active Orders</h1>
                    <p>All active orders</p>
                    <div className="rounded-md border-gray-300 border overflow-hidden">
                        <Table className={" "}>
                            <TableHeader className={""}>
                                <TableRow className={""}>
                                    <TableHead className="">Order ID</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Total Qty</TableHead>
                                    <TableHead>Order Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="">Total Capital</TableHead>
                                    <TableHead className="">Expected delivery</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-semibold">001</TableCell>
                                    <TableCell className="font-semibold">Brand</TableCell>
                                    <TableCell className="font-semibold">No.</TableCell>
                                    <TableCell className="font-semibold">date</TableCell>
                                    <TableCell className="font-semibold">status</TableCell>
                                    <TableCell className="font-semibold">capital</TableCell>
                                    <TableCell className="font-semibold">delivey date</TableCell>
                                    <TableCell className="flex gap-1.5 justify-end font-semibold">
                                        <button className="w-1/5 rounded-sm border-gray-300 border flex items-center justify-evenly py-0.5 bg-gray-100 text-[90%]">
                                            <Eye className="w-3.5" />
                                            View
                                        </button>
                                        <button className="w-1/4 rounded-sm border-green-600 border flex items-center justify-evenly text-green-600 bg-green-100 text-[90%]">
                                            <StickyNote className="w-3.5" />
                                            Invoice
                                        </button>
                                        <button className="w-1/4 rounded-sm border-blue-500 border flex items-center justify-evenly bg-blue-100 text-blue-500 text-[90%]">
                                            <Scissors className="w-3.5" />
                                            Split Order
                                        </button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Orders;
