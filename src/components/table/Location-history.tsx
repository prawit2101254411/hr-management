"use client"
import React from 'react'
import { useModal } from '../modal/provider'
import { FormButton } from '../FormButton'
import { toast } from 'sonner'
// import { editOriginalPosition } from '@/utils/action'

type Props = {
    NewpositionUser: any;
}

export default function LocationhistoryModal({ NewpositionUser }: Props) {
    // console.log(position)
    const modal = useModal();
    return (
        <div className='group hover:mt-1 text-black'>
            <button
                onClick={() => modal?.show(<FormOriginalPosition NewpositionUser={NewpositionUser} />)}
                type='button'
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clock-history " viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                </svg>
            </button>
            <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-2 rounded mt-2">
                ประวัติ
            </div>
        </div>
    )
}
const FormOriginalPosition = ({ NewpositionUser }: Props) => {
    const original = NewpositionUser?.originalpos;
    // console.log(NewpositionUser)
    const modal = useModal();
    return (
        <div className="mx-auto overflow-auto h-[600px] w-[720px] bg-white border-2 rounded-xl">
            <form className=" overflow-auto py-6 px-9" >
                <input name="id" hidden value={''} />
                <div className=" rounded">
                    <h1 className=' text-left text-3xl pl-5 font-bold text-gray-900'>ข้อมูลตำแหน่งผู้ใช้ปัจจุบัน</h1>
                    <div className=' mt-10 ml-12'>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='newpos'>
                                    ตำแหน่ง
                                </label>
                                <input className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                    name='newpos'
                                    type='text'
                                    id='newpos'
                                    defaultValue={NewpositionUser?.newposition}
                                    placeholder="ชื่อตำแหน่ง"
                                />
                            </div>
                            <div className="md:ml-2">
                                <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="newlevel">
                                    ระดับ
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="newlevel"
                                    type="text"
                                    name='newlevel'
                                    defaultValue={NewpositionUser?.newlevel}
                                    placeholder="ชื่อระดับ"
                                />
                            </div><hr />
                        </div>
                        <div className="mb-4 inline-block">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="newsalary">
                                เงินเดือน
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="newsalary"
                                type="number"
                                name='newsalary'
                                defaultValue={NewpositionUser?.newsalary}
                                placeholder="0.00.-"
                            />
                        </div>
                        <div className=" ml-20 inline-block">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="dateUpdate">
                                วันที่อัพเดท
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="dateUpdate"
                                type="text"
                                name='dateUpdate'
                                defaultValue={NewpositionUser?.dateUpdate}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <h1 className=' mt-5 text-left text-2xl pl-5 font-medium text-gray-900'>ประวัติการเลื่อนตำแหน่ง</h1>
                <table className=" border-t text-left text-sm text-gray-500 bg-opacity-25">
                    <thead className="bg-gray-300 bg-opacity-25 ">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ลำดับ</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ตำแหน่ง</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ระดับ</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">เงินเดือน</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">วันเริ่มทำงาน</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-gray-100">
                        {original?.map(({ origipos, oldlevel, oldsalary, Startdate, dateUpdate }: any, index: number) =>
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{index + 1}</td>
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div>{origipos}</div>
                                    </div>
                                </th>
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-4">
                                        {oldlevel}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 bg-opacity-25 px-2 py-1 text-xs font-semibold text-blue-600">
                                            {oldsalary}
                                        </span>
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        {Startdate}
                                    </div>
                                </td> */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        {dateUpdate}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </form>
        </div>
    )
}