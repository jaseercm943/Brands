import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table.jsx";
import { Badge } from "../ui/badge.jsx";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";


function TrimsTable({theTrims,id,modelname}) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Trim Name</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Retail Price</TableHead>
                        {/* <TableHead>Margin</TableHead> */}
                        <TableHead>Drive</TableHead>
                        <TableHead>Fuel Type</TableHead>
                        <TableHead>Color Combinations</TableHead>
                        {/* <TableHead>Status</TableHead> */}
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/* Row 1 */}
                   {theTrims?.map((trims,i)=> <TableRow key={i}>
                        <TableCell className="font-medium">{trims.TrimName}</TableCell>

                        <TableCell>${trims.unitPrice}</TableCell>

                        <TableCell>${trims.retailPrice}</TableCell>

                        {/* <TableCell>
                            <p className="text-green-600 font-semibold">$4,000.00</p>
                            <p className="text-xs text-green-500">14.3%</p>
                        </TableCell> */}

                        <TableCell>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                {trims.driveType}
                            </Badge>
                        </TableCell>

                        <TableCell>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                {trims.fuelType}
                            </Badge>
                        </TableCell>

                        <TableCell className="">
                            {trims.colorComb.length>=1&&<Badge variant="secondary" className="bg-gray-100 text-gray-700">
                               {trims.colorComb[0].intColor}+{trims.colorComb[0].extColor}
                            </Badge>}
                            {trims.colorComb.length>=2&&<Badge variant="secondary" className="bg-gray-100 text-gray-700">
                               {trims.colorComb[1].intColor}+{trims.colorComb[1].extColor}
                            </Badge>}
                            {trims.colorComb.length>2&&
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                +{trims.colorComb.length-2} more
                            </Badge>}
                        </TableCell>

                        {/* <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Active</Badge>
                        </TableCell> */}

                        <TableCell className=" flex justify-end gap-2 items-center">
                            <Link className="p-2 rounded bg-gray-100 hover:bg-gray-200"  to={`/edit/modelandTrims/${modelname}/${id}/${trims.TrimName}`}>
                                <SquarePen className="w-4 h-4" />
                            </Link>
                            <Link className="p-2 rounded bg-gray-100 hover:bg-gray-200">
                                <Trash2 className="w-4 h-4" />
                            </Link>
                        </TableCell>
                    </TableRow>)}                    
                </TableBody>
            </Table>
        </>
    );
}

export default TrimsTable;
