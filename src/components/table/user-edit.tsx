"use client"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { editUser } from "@/utils/action"
import { useModal } from "@/components/modal/provider"
import { Duplex } from "stream"
import { useState } from "react"
import { time } from "console"
import { format, parseISO } from 'date-fns';

// เก็บ Timestamp ปัจจุบัน
const currentTimestamp = new Date().getTime();

// ฟอร์แมต Timestamp เป็นวันที่
const formattedDate = format(currentTimestamp, 'yyyy-MM-dd HH:mm:ss');
interface props {
    id: number;
    username: string;
    fname: string;
    lname: string;
    level: boolean;
    u_num: string;
    phone: string;
    Affil: any;
    Groups: any;
    affil: any;
    salary: any;
    NewpositionUser: any;
    Position: any;

}

export default function EditUserModal({ Position, id, username, fname, lname, level, u_num, phone, Affil, Groups, affil, salary, NewpositionUser }: props) {
    const modal = useModal();
    return (
        <div className="group hover:mt-1 text-black">
            <button
                type="button"
                onClick={() => modal?.show(<FormEdit Position={Position} NewpositionUser={NewpositionUser} salary={salary} id={id} username={username} fname={fname} lname={lname} level={level} u_num={u_num} phone={phone} Affil={Affil} Groups={Groups} affil={affil} />)}
            >
                <a x-data="{ tooltip: 'Edite' }" href="#">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip">
                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                </a>

            </button>
            <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-2 rounded mt-2">
                แก้ไขข้อมูลผู้ใช้
            </div>
        </div>
    );
}


const FormEdit = ({ id, username, fname, lname, phone, affil, Affil, salary, NewpositionUser, Groups, Position }: props,) => {
    //    console.log(Groups)
    const [GroupData, setGroup] = useState([]);

    const [PositionData, setPosData] = useState([]);

    const handleAffilChange = (e: any) => {
        const affilValue = JSON.parse(e.target.value);
        setGroup(affilValue.Group);

    }
    const handleGroupChange = (e: any) => {
        const groupValue = JSON.parse(e.target.value)
        setPosData(groupValue.Position)
    }
    // console.log(affilValue)

    const modal = useModal();
    return (
        <>
            <div className="mx-auto w-full max-w-[550px] bg-white shadow-md border rounded-xl">
                <form className="py-6 px-9"
                    action={async (data: FormData) => {
                        editUser(data)
                            .then(async (res) => {
                                if (res?.error) {
                                    toast.error(res.error);
                                } else {
                                    modal?.hide();
                                    toast.success(`แก้ไขข้อมูลสำเร็จ!`);
                                }
                            })
                            .catch((err: Error) => toast.error(err.message))
                    }}
                    method="POST"
                >
                    <input name="id" hidden value={JSON.stringify({ iduser: id, salaryid: salary?.id, date: formattedDate, idnewposition: NewpositionUser?.id })} />
                    <div className=" rounded">
                        <h1 className="text-left text-3xl pl-5 mt-2 font-semibold text-gray-900">ข้อมูลผู้ใช้</h1>
                        <div className=' p-10'>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="">
                                    <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='fname'>
                                        ชื่อ
                                    </label>
                                    <input className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                        name='fname'
                                        type='text'
                                        defaultValue={fname}
                                        placeholder="ชื่อ"
                                    />
                                </div>
                                <div className="md:ml-2">
                                    <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="lname">
                                        นามสกุล
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="lname"
                                        type="text"
                                        name='lname'
                                        defaultValue={lname}
                                        placeholder="นามสกุล"
                                    />
                                </div><hr />
                            </div>
                            <div className="mb-4">
                                <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="email">
                                    อีเมล
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="email"
                                    name='username'
                                    defaultValue={username}
                                    placeholder="username"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            </div>
                            <div className="">
                                <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="phone">
                                    เบอร์โทร
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="tel"
                                    name='phone'
                                    defaultValue={phone}
                                    placeholder="xxx-xxx-xxxx"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    title="กรุณากรอกให้ถูกต้อง 0xx-xxx-xxxx"
                                />
                            </div>
                            <div className=" mt-3">
                                <label form="Affil" className="flex left-0 mb-2 text-sm font-bold text-gray-900 dark:text-white">สังกัด</label>
                                <select
                                    required
                                    defaultValue=""
                                    onChange={handleAffilChange}
                                    name='Affil'
                                    id="Affil"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={JSON.stringify(Affil)} selected>{Affil?.Affilname}</option>
                                    {affil.slice(0).map((item: any, index: number) => {
                                        if (item.id == undefined || item.id == "" || item.id == null) return null;
                                        return <option key={index} value={JSON.stringify(item)}>{item.Affilname}</option>
                                    }
                                    )}
                                </select>
                            </div>
                            <div className=" mt-3">
                                <label form="countries" className="flex left-0 mb-2 text-sm font-bold text-gray-900 dark:text-white">กลุ่ม</label>
                                <select
                                    required
                                    defaultValue=""
                                    onChange={handleGroupChange}
                                    name='Groups'
                                    id="Groups"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={JSON.stringify(Groups)} selected>{Groups?.Groupname}</option>
                                    {GroupData.map((item: any, index: number) => {
                                        if (item.id !== item.id || id == undefined || item.id == "" || item.id == null) return
                                        return <option key={index} value={JSON.stringify(item)}>{item.Groupname}</option>
                                    })}
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
                                    <option value="">{Position?.Posnames}</option>
                                    {PositionData.map((item: any, index: number) => {
                                        if (item.id !== item.id || id == undefined || item.id == "" || item.id == null) return
                                        return <option key={index} value={JSON.stringify(item)}>{item.Posnames}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <FormButton>
                            <div className=" flex items-center justify-center rounded-xl w-28 h-14 border hover:bg-blue-500 hover:text-white">
                                บันทึก
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" ml-2 bi bi-floppy" viewBox="0 0 16 16">
                                    <path d="M11 2H9v3h2z" />
                                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                                </svg>
                            </div>
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    )
}
