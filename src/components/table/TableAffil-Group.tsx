"use cliant"
import React from 'react';
import CreateGroupModal from './group-create';
import DeleteAffilModal from './affil-delate';
import { PaginationButton } from '../pogination';

type props = {
    affil:any;
    DataAffil:any;
    currentPage: number;
}

export default async function TableAffilGroup({affil,currentPage,DataAffil}: props) {
//  console.log(affil)
    return (
            <form className="rounded-lg border-2 bg-white p-3.5 lg:p-6 ">
                <table className=" w-full border-collapse  text-left text-sm text-gray-500 bg-opacity-25">
                    <thead className="bg-gray-50 bg-opacity-25 ">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ลำดับ</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ชื่อสังกัด</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">จำนวนกลุ่ม</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {DataAffil.slice(0).map(({ id, Affilname, Group }: any, index: number) =>
                            <tr key={index} className="hover:bg-gray-50 border border-gray-100">
                                <td className="px-6 py-4">{index+1}</td>
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div>{Affilname}</div>
                                    </div>
                                </th>
                                <td className="px-10 py-4">
                                <span className="flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 bg-opacity-25 px-2 py-1 text-xs font-semibold text-blue-600">
                                        {Group.length}
                                    </span>
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-4">
                                <DeleteAffilModal id={id} affilname={Affilname}/>
                                <CreateGroupModal id={id} Group={Group} />
                                </div>
                            </td>

                            </tr>
                           )}
                    </tbody>
                </table>
                <PaginationButton
                pathName="tableAffil-Group"
                disabled={DataAffil.length === 0}
                currentPage={currentPage}
            />

            </form>
    )
}
