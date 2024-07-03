"use client"
import React, { use } from 'react'
import { FormButton } from './FormButton';
import { edit } from '@/utils/action'
import { Affil, Group,Sex } from '@prisma/client';
import { useAmp } from 'next/amp';


export default function EditForm({ user, session }: any) {
    interface user {
        id: number;
        fname: string;
        lname: string;
        phone: string;
        birthday: string;
        u_num: string;
        sex: boolean;
        username: string;
        password: string;
        Affil: string;
        Group: string;
        Avatar: string;

    };
    // console.log(users)
    return (
        <form action={edit} className="pt-10 p-20 w-full mx-auto items-canter justify-center bg-white rounded-lg">
            <input name='inputId' defaultValue={user.id} hidden />
            <h1 className=' flex items-center justify-center text-xl font-extrabold'>ข้อมูลผู้ใช้</h1><br />
            <div className=' flex items-center justify-center'>
                <img
                    className="rounded-full object-cover object-center"
                    src={user.Avatar} alt="Trulli" width="200" height="200"
                />
            </div><br />
            <div className="mb-4">
                <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="URL">
                    ที่อยู่รูปภาพ
                </label>
                <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="Avatar"
                    type="text"
                    name='Avatar'
                    defaultValue={user.Avatar}
                    placeholder="URL"
                />
            </div>

            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='fname'>
                        ชื่อ
                    </label>
                    <input className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                        name='fname'
                        type='text'
                        defaultValue={user.fname}
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
                        defaultValue={user.lname}
                        placeholder="นามสกุล"
                    />
                </div><hr />
                <div className='pl-5'>
                    <label form="sex" className="flex left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">เพศ</label>
                    <select
                        defaultValue={user.sex}
                        name='sex'
                        id="sex"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {/* <option value={Sex.MAN}>ชาย</option>
                        <option value={Sex.WOMAN}>หญิง</option> */}
                    </select>

                </div>
            </div>
            <div className="mb-4">
                <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="email">
                    อีเมล
                </label>
                <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name='username'
                    defaultValue={user.username}
                    placeholder="username"
                />
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='u_num'>
                        รหัสประจำตัวประชาชน
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="u_num"
                        type="numder"
                        name='u_num'
                        defaultValue={user.u_num}
                        placeholder="เลข 13 หลัก"
                    />
                </div>
                <div className="md:ml-2">
                    <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="phone">
                        เบอร์โทร
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="number"
                        name='phone'
                        defaultValue={user.phone}
                        placeholder=""
                    />
                </div>
            </div>

            <div className="relative max-w-sm">
                <label className="flex left-0 pt-0 font-bold text-gray-700" form='birthday'>
                    วันเดือนปีเกิด
                </label>
                <input
                    type="date"
                    id='birthday'
                    name='birthday'
                    defaultValue={user.birthday}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div><br />
            <br />
            <h1 className='pl-5 font-extrabold'>เปลี่ยนรหัสผ่าน</h1><br />
            <div className=' bg-gray-300 p-10 bg-opacity-25 rounded-lg'>
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
                            defaultValue={user.password}
                            placeholder="******************"
                        />
                    </div>
                    <div className="md:ml-2">
                        <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="c_password1">
                            ยืนยันรหัสผ่าน
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="c_password"
                            type="password"
                            name='c_password'
                            defaultValue={user.password}
                            placeholder="******************"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-6 border-t" />
            <div className=' flex items-center justify-center'>
                <div className=" flex items-center justify-center text-center w-40 h-10 font-bold bg-gray-100 rounded-full hover:bg-gray-300 hover:text-gray-100 focus:outline-none focus:shadow-outline">
                    <FormButton>
                        บันทึก
                        </FormButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" ml-2 bi bi-floppy" viewBox="0 0 16 16">
                        <path d="M11 2H9v3h2z" />
                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                    </svg>
                </div>
            </div>
        </form>

    )
}
