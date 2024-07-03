"use client"
import React from 'react'
import { FormButton } from '../FormButton'
import { RequestPeple } from '@/utils/action'

export default function Requastpage() {
  return (
    <form action={RequestPeple}
    className=" w-1/3 h-[600px] ml-20 bg-white mt-14 shadow-xl rounded-xl border px-12"
    >
    <div className="group  mt-16">
      <label htmlFor="" className="">อีเมล</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="a-z@email.com"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        className="w-full h-9 border-2 rounded-xl pl-4" />
    </div>
    <div className="group  mt-2">
      <label htmlFor="" className="">เลขบัตรประชาชน</label>
      <input
        type="tel"
        name="firstnumber"
        id="firstnumber"
        placeholder="xxxxx-xx-xxx-xxx(0-9)"
        pattern="[0-9]{5}-[0-9]{2}-[0-9]{3}-[0-9]{3}"
        className="w-full h-9 border-2 rounded-xl  pl-4" />
    </div>
    <div className="group  mt-2">
      <label htmlFor="" className="">เบอร์โทรติดต่อ</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="0xx-xxx-xxxx(0-9)"
        pattern="0+[0-9]{2}-[0-9]{3}-[0-9]{4}"
        className="w-full h-9 border-2 rounded-xl pl-4" />
    </div>
    <div className="group  mt-2">
      <label htmlFor="" className="">ข้อเสนอเเนะ</label>
      <textarea
        name="text"
        id="text"
        placeholder="ใส่ข้อความ"
        className="w-full h-40 border-2 rounded-xl pl-4" />
    </div>

    <div className=' border inline-block mt-7 ml-20 px-8 py-2 rounded-xl hover:bg-blue-400 hover:text-white hover:shadow-xl'>
    <FormButton>
      ส่งคำขอ
      </FormButton>
    </div>
  </form>
  )
}
