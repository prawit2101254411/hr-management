"use client"
import React from 'react'
import DeleteUserModal from './user-delete';
import { PaginationButton } from '@/components/pogination';
import EditUserModal from './user-edit';
import { editLevel } from '@/utils/action';
import { editStatus } from '@/utils/action';
import { useModal } from '../modal/provider';
import SalaryForm from '../tablesalary/SalaryForm';
import LocationhistoryModal from './Location-history';
import RequesUser from '../RequesUser/RequesUser';

type props = {
    data: any | [],
    currentPage: number,
    affil: any,
    HrName: any,
}

export default function TableUser({ data, currentPage, affil, HrName }: props) {
    const modal = useModal();

    const handleChangeLevel = (e: any) => {
        const Levels = JSON.parse(e.target.value);
        editLevel(Levels)
    }
    const handleChangeStatus = (e: any, id: number) => {
        const sta = (JSON.stringify({ status: JSON.stringify(e.target.checked), id: id }));
        editStatus(JSON.parse(sta))
        const stat = JSON.parse(sta)
    }

    return (
        <form className='mx-auto border-2 rounded-xl '>
            <table className="w-full bg-white text-left text-sm text-gray-500 ">
                <thead className="bg-gray-50 bg-opacity-25 ">
                    <tr>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">รหัส</th>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">ชื่อ</th>
                        <th scope="col" className="px-1 py-4 font-semibold text-black">สถานะ</th>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">Role</th>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">สังกัด </th>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">กลุ่ม</th>
                        <th scope="col" className="px-5 py-4 font-semibold text-black">ดำเนินการ</th>
                    </tr>
                </thead>
                <tbody className=" border-t bg-white bg-opacity-25 ">
                    {data.slice(0).map((item: any, index: number) =>
                        <tr key={index} className="hover:bg-gray-50 border border-gray-100">
                            <td className=" px-8">{index + 1}</td>
                            <td className="flex gap-3 px-1 py-4 font-normal text-black">
                                <div className=' group '>
                                    <button type='button' className=" relative flex">
                                        {item?.RequestUser?.Status == "false" && <div className=' flex flex-col text-red-500 rounded-full font-bold text-2xl'>!</div>}
                                        {item?.RequesUserWorkcertificate?.Status == "false" && <div className=' flex flex-col  text-red-500 rounded-full font-bold text-2xl'>!</div>}
                                        {item.status == "true" &&
                                            <img
                                                onClick={() => modal?.show(<RequesUser RequesUserWorkcertificate={item.RequesUserWorkcertificate} RequesUser={item.RequestUser} HrName={HrName} />)}
                                                className=" flex flex-col  max-h-[50px] max-w-[50px] hover:shadow-xl  hover:border shadow-md rounded-full object-cover object-center"
                                                src={item.Avatar}
                                                alt=""
                                            />}
                                        {!item.Avatar &&
                                            <div>{item.status == "true" &&
                                                <img
                                                    onClick={() => modal?.show(<RequesUser RequesUserWorkcertificate={item.RequesUserWorkcertificate} RequesUser={item.RequestUser} HrName={HrName} />)}
                                                    src='/icon/noneprofile.jpg'
                                                    className=' inline-block max-h-[50px] max-w-[50px]  hover:border shadow-md rounded-full object-cover object-center' />
                                            }</div>}
                                        {item.status == "true" && <div className=' flex flex-col mt-12 bg-green-500 w-2 h-2 rounded-full'></div>}
                                    </button>
                                    {item?.RequestUser?.Status == "false" && <div className=" hidden group-hover:block group-focus:block bg-white bg-opacity-60 text-red-500 py-1 px-2 rounded mt-1">
                                        มีคำร้อง!
                                    </div>}
                                </div>
                                <div className='group mt-2 hover:mt-3 text-black'>
                                    <div onClick={() => modal?.show(<SalaryForm salary={item.salary} Reques={item.Requestsalarycertificate} />)} className=" w-full">
                                        <div className="text-gray-700 text-base font-bold w-[170px]">{item.fname} {item.lname} </div>
                                        <div className="text-gray-400 text-xs">{item.username}</div>
                                    </div>
                                    <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-2 rounded mt-2">
                                        จัดการเงินเดือน
                                    </div>
                                </div>
                            </td>
                            <td className=" py-4 text-black ">
                                <label className="relative inline-flex items-center cursor-pointer  ">
                                    <input
                                        onChange={(e) => handleChangeStatus(e, item.id)}
                                        type="checkbox"
                                        role='checkbox'
                                        id="checkbox"
                                        className="sr-only peer"
                                        checked={JSON.parse(item.status)}
                                    />
                                    <div className=" w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </td>
                            <td className="px-3 py-4 text-black">
                                <select
                                    onChange={handleChangeLevel}
                                    defaultValue={JSON.stringify({ id: item.id, level: item.level })}
                                    name='level'
                                    id='level'
                                    className=' rounded-lg w-18 h-8 bg-gray-100 bg-opacity-25 hover:bg-gray-300'
                                >
                                    <option value={JSON.stringify({ id: item.id, level: "ADMIN" })}>ADMIN</option>
                                    <option value={JSON.stringify({ id: item.id, level: "HR" })}>HR</option>
                                    <option value={JSON.stringify({ id: item.id, level: "USER" })}>USER</option>
                                </select>
                            </td>
                            <td >
                                <span className="flex gap-2 text-black ">
                                    <span className="inline-flex items-center gap-1 rounded-full  bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                                        {item?.Affil?.Affilname}
                                    </span>
                                </span>
                            </td>
                            <td >
                                <span className="flex gap-2 text-black">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                        {item?.Groups?.Groupname}
                                    </span>
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-4">
                                    <LocationhistoryModal NewpositionUser={item.NewpositionUser} />
                                    {item.level != "ADMIN" && <DeleteUserModal user={item} />}
                                    <EditUserModal NewpositionUser={item.NewpositionUser} salary={item.salary} id={item.id} username={item.username} fname={item.fname} lname={item.lname} level={item.level} u_num={item.u_num} phone={item.phone} Affil={item.Affil} affil={affil} Groups={item.Groups} Position={item.Position} />
                                </div>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            {data?.length === 0 && (
                <div className='text-center'>
                    <span>No data</span>
                </div>
            )}
            <PaginationButton
                pathName="tableuser"
                disabled={data.length === 0}
                currentPage={currentPage}
            />


        </form>

    )
}
