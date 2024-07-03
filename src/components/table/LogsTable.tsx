"use client"
import { time } from 'console';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { PaginationButton } from '../pogination';
import { toast } from 'sonner';

type Props = {
    Requestsalarycertificate: any | [],
    salarycertificate: any | [],
    currentPage: number,
    contect: any;
}

export default function LogsTable({ contect,  Requestsalarycertificate, salarycertificate }: Props) {
    // console.log(Requestsalarycertificate)

    const [datas, setData] = useState([]);
    const hanbleChange = (e: any) => {
        const Value = JSON.parse(e.target.value);
        if (Value == "1") {
            setData(Requestsalarycertificate);
        }

        if (Value == "2") {
            setData(salarycertificate);
        }

        if (Value == "3") {
            toast.error("ยังไม่มีการอัพเดท")
        }
         if(Value == "0"){
            toast.error("เลือกรายการที่ต้องการ")
         }
    }

    return (
        <div>
            <div className=' pt-5'>
                <select
                    defaultValue=""
                    className=' p-3 border-2 rounded-xl bg-white font-xl text-black hover:bg-gray-300'
                    onChange={hanbleChange}
                >
                    <option value="0">เลือก</option>
                    <option value={"1"}>หนังสือรับรอง</option>
                    <option value={"2"}>สลิปเงินเดือน</option>
                    <option value={"3"}>การตอบรับ</option>
                </select>
            </div>
            <div className=' p-1'>
                <TableLogslip datas={datas}  />
            </div>
        </div>
    )
}

const TableLogslip = ({ datas }: any) => {
    // const date2 = new Date(formattedDate)
    // const current = date2.toLocaleDateString('th-TH', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // })
    return (
        <form className="rounded-lg border-2 bg-white p-3.5 lg:p-6 text-black">
            <table className=" w-full border-collapse  text-left text-sm text-gray-500 bg-opacity-25">
                <thead className="bg-gray-50 bg-opacity-25 ">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ลำดับ</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ข้อความ</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-gray-900">วันเดือนปี/เวลา</th>
                        <th scope="col" className="px-6 py-4 font-semibold text-gray-900">ชื่อผู้ใช้</th>
                        {/* <th scope="col" className=" px-6 py-4 font-medium text-gray-900">เบอร์โทร</th> */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-black">
                    {datas.slice(0).map((item: any, index: number) =>
                        <tr key={index} className="hover:bg-gray-50 ">
                            <td className="px-6 py-4">{index + 1}</td>
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                <div className="text-sm">
                                    <div>{item?.coment}{item?.Content}{item.text}</div>
                                </div>
                            </th>
                            <td className="px-5 py-4">
                                <span className="flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 bg-opacity-25 px-2 py-1 text-xs font-semibold text-blue-600">
                                        {item?.date}
                                    </span>
                                </span>
                            </td>
                            <td className="px-3 py-4">
                                <div className="items-center justify-center gap-4">
                                    {item?.Logs?.user?.fname} {item?.Logs?.user?.lname}{item.email}
                                </div>
                            </td>
                            <td className="px-3 py-4">
                                <div className="items-center justify-center gap-4">
                                    {item?.phone}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </form>

    )
}
