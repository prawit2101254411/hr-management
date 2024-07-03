"use client"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { createUser } from "@/utils/action"
import { useModal } from "@/components/modal/provider"
import { useState } from "react"
import { Sex } from "@prisma/client"
import { format, parseISO } from 'date-fns';


// เก็บ Timestamp ปัจจุบัน
const currentTimestamp = new Date().getTime();

// ฟอร์แมต Timestamp เป็นวันที่
const formattedDate = format(currentTimestamp, 'yyyy-MM-dd HH:mm:ss');

interface props {
    affil: any;
    data: any;
}

export default function CreateUserModal({ affil, data }: props) {

    const modal = useModal();
    return (
        <button
            type="button"
            onClick={() => modal?.show(<FormCreate affil={affil} data={data} />)}
            className=" mt-7"
        >
            <div className="flex  focus:outline-none bg-white hover:bg-gray-300 border-2 focus:ring-4 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 ">
                เพิ่มผู้ใช้
                <a className=" pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" bi bi-person-plus-fill " viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                    </svg>

                </a>
            </div>

        </button>
    );
}

const FormCreate = ({ affil, data }: props) => {
    interface data {
        sex: boolean;
    };
    const [GroupData, setGroup] = useState([]);
    const [AffilData, setAffil] = useState([]);

    const handleGroupChange = (e: any) => {
        const Affilvalue = JSON.parse(e.target.value);
        setAffil(e.target.value);
        setGroup(Affilvalue.Group);
    }
    const [PositionData, setPosData] = useState([]);
    const [GroupValue, setGroups] = useState([]);
    const handlepos = (e: any) => {
        const groupValue = JSON.parse(e.target.value);
        setGroups(e.target.value);
        setPosData(groupValue.Position);
//    console.log(groupValue)

    }
    const modal = useModal();
    return (
        <>
            <div className="mx-auto overflow-auto h-[680px] w-[580px] bg-white border-2 rounded-xl">
                <h1 className=" font-bold text-3xl mt-7 ml-10">เพิ่มผู้ใช้</h1>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded bg-opacity-50"
                    action={async (data: FormData) => {
                        createUser(data)
                            .then(async (res: any) => {
                                if (res.error) {
                                    toast.error('ใส่ข้อมูลให้ครบ');
                                    console.log(res.error)
                                } else {
                                    modal?.hide();
                                    toast.success(`บันทึกสำเร็จ!`);
                                }
                            })
                            .catch((err: Error) => toast.error(err.message))
                    }}
                    method="POST"
                >
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='name'>
                                ชื่อ
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="fname"
                                type="text"
                                name='fname'
                                placeholder="ชื่อ"
                                required
                            />
                        </div>
                        <div className="md:ml-2">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="lastName">
                                นามสกุล
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="lname"
                                type="text"
                                name='lname'
                                placeholder="นามสกุล"
                                required
                            />
                        </div>
                        <div className="ml-3 shadow">
                            <label form="sex" className="flex left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">เพศ</label>
                            <select
                                defaultValue=""
                                name='sex'
                                id="sex"
                                className=" border px-3 py-2 rounded-md "
                            >
                                <option value="">เพศ</option>
                                <option value={Sex.MAN}>ชาย</option>
                                <option value={Sex.WOMAN}>หญิง</option>

                            </select>

                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="username">
                            อีเมล
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="username"
                            type="email"
                            name='username'
                            placeholder="Email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            required
                        />
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="password">
                                รหัสผ่าน
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name='password'
                                placeholder="******************"
                            />
                            {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                        </div>
                        <div className="md:ml-2">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="c_password">
                                ยืนยันรหัสผ่าน
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="c_password"
                                type="password"
                                name='password'
                                placeholder="******************"
                            />
                        </div>
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='u_num'>
                                รหัสประจำตัวประชาชน
                            </label>
                            <input
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="u_num"
                                type="tel"
                                name='u_num'
                                placeholder="xxxxx-xx-xxx-xxx"
                                pattern="[0-9]{5}-[0-9]{2}-[0-9]{3}-[0-9]{3}"
                                required
                            />
                        </div>
                        <div className="md:ml-2">
                            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="phone">
                                เบอร์โทร
                            </label>
                            <input
                                className="w-full px-3 py-2  text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="tel"
                                name='phone'
                                placeholder="0xx-xxx-xxxx"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative inline-block">
                        <label className="flex left-0 pt-0 font-bold text-gray-700" form='birthday'>
                            วันเดือนปีเกิด
                        </label>
                        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div> */}
                        <input
                            type="date"
                            id='birthday'
                            name='birthday'
                            required
                            className=" border px-9 py-1 shadow rounded-md" placeholder="Select date" />
                    </div>
                    <div className=" mt-5">
                        <label form="Affil" className="flex  left-0 mb-2 text-sm font-bold text-gray-900 dark:text-white">สังกัด</label>
                        <select
                            required
                            value={AffilData}
                            onChange={handleGroupChange}
                            name='AffilId'
                            id="AffilId"
                            className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">เลือกสังกัด</option>

                            {affil.slice(0).map((item: any, index: number) => {
                                if (item.id == undefined || item.id == "" || item.id == null) return
                                return <option key={index} value={JSON.stringify(item)}>{item.Affilname}</option>
                            }
                            )}
                        </select>
                    </div>
                    <div className=" mt-3">
                        <label form="countries" className="flex left-0 mb-2 text-sm font-bold text-gray-900 dark:text-white">กลุ่ม</label>
                        <select
                            required
                            value={GroupValue}
                            onChange={handlepos}
                            name='GroupId'
                            id="GroupId"
                            className="bg-gray-50 border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">เลือกกลุ่ม</option>
                            
                            {GroupData.slice(0).map(( item : any, index: number) => {
                                if ( item.id == undefined || item.id == "" || item.id == null) return
                                return <option key={index} value={JSON.stringify(item)}>{item.Groupname}</option>
                            }
                            )}
                        </select>
                    </div>
                    <div className=" mt-3">
                        <label form="countries" className="flex left-0 mb-2 text-sm font-bold text-gray-900 dark:text-white">กลุ่ม</label>
                        <select
                            required
                            defaultValue=""
                            name='Position'
                            id="Position"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">เลือกตำแหน่ง</option>
                            {PositionData.map((item: any, index: number) => {
                                if (item.id !== item.id || item.id == undefined || item.id == "" || item.id == null) return
                                return <option key={index} value={JSON.stringify({Posnames:item.Posnames,levels:item.levels,salarys:item.salarys,dateUpdate:formattedDate})}>{item.Posnames}</option>
                            })}
                        </select>
                    </div>
                     <br />
                    <div className=" flex items-center justify-center">
                        <FormButton>
                            <div className="flex items-center justify-center rounded-xl border-2 p-3 hover:bg-blue-500 hover:text-white">
                                เพิ่มผู้ใช้
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" ml-2 bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </div>
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    )
}
