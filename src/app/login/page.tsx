import React from 'react'
import LoginForm from '@/components/LoginForm'
import { getSession } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function Page() {

  const session = await getSession();
  if (session?.user) {
    redirect("/app/profile")
  }
  return (
    <div className=" flex items-center justify-center ">
      <div className=" relative w-[400px] mt-60  border-2 rounded-2xl shadow-xl shadow-gray-300  bottom-0 flex flex-col  bg-white ">
        <LoginForm />
      </div>
    </div>
  )
}
