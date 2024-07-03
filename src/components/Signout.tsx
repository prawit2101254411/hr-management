"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

export default function Signout() {
    return (
        <button onClick={(e) => {
            e.preventDefault()
            signOut({ callbackUrl: "/login" })
        }}
            type='button'
        >
            <div className=" flex hover:shadow-md w-[260px] h-[40px] px-3 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                    <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z" />
                    <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                </svg>
                <div className=' ml-3 text-black text-lg hover:text-2xl hover:text-red-500 '>
                    ออกจากระบบ
                </div>
            </div>
        </button>
    )
}
