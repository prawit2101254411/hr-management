'use client'
import React from 'react'
import { ResponseHr } from '@/utils/action'
import { toast } from 'sonner'
import { useModal } from '../modal/provider'
import { ResponseHrs } from '@/utils/action'

type Props = {
  RequesUser: any,
  HrName: any,
  RequesUserWorkcertificate: any,
}

export default function RequesUser({ RequesUser, HrName, RequesUserWorkcertificate }: Props) {
  const modal = useModal();
  const handle = (user: any) => {
    ResponseHr(user)
    toast.success('ดำเนินการอนุมัตร หนังสือรับรองเงินเดือนเรียบร้อยเเล้ว')
  }
  const handles = (user: any) => {
    ResponseHrs(user)
    toast.success('ดำเนินการอนุมัตร หนังสือรับรองการทำงานเรียบร้อยเเล้ว')
  }

  return (
    <div className=' overflow-auto w-[650px] h-[350px] bg-gray-100 shadow-md rounded-md text-black'>
      <h1 className=' ml-5 mt-3 text-xl font-semibold'>แจ้งเตือน !</h1>
      <div className=' flex flex-col items-center justify-center mt-7'>
        {RequesUser?.Status == "false" && <div className='w-[620px] h-[100px] bg-white shadow-md rounded-lg border flex items-center justify-center'>
          <span className=' font-nomol text-md '><h1 className=' inline-block text-xl font-semibold'>{RequesUser.user.fname}</h1> ส่ง{RequesUser.text} เมื่อ{RequesUser.dateTime} <button onClick={(user) => handle(JSON.stringify({ id: RequesUser.id, Status: "true", Hrname: `${HrName.fname} ${HrName.lname}` }))} className=' border-2 rounded-md px-1 py-1 ml-3 shadow-md hover:bg-green-500 hover:text-white'>อนุมัตร</button></span>
        </div>}
        {RequesUserWorkcertificate?.Status == "false" && <div className='w-[620px] h-[100px] mt-5 bg-white shadow-md rounded-lg border flex items-center justify-center'>
          <span className=' font-nomol text-md '><h1 className=' inline-block text-xl font-semibold'>{RequesUserWorkcertificate.user.fname}</h1> ส่ง{RequesUserWorkcertificate.text} เมื่อ{RequesUserWorkcertificate.dateTime} <button onClick={(user) => handles(JSON.stringify({ id: RequesUserWorkcertificate.id, Status: "true", Hrname: `${HrName.fname} ${HrName.lname}` }))} className=' border-2 rounded-md px-1 py-1 ml-3 shadow-md hover:bg-green-500 hover:text-white'>อนุมัตร</button></span>
        </div>}
      </div>
    </div>
  )
}