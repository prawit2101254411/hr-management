'use client'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

type Props = {}

export default function NavbarPage({ }: Props) {

    return (
        <div className=" fixed navbar z-50 bg-base-100 h-[150px]">
            <div className="flex-1 ml-20 w-full h-full">
                <img className=' h-20 w-20' src="/icon/icon3.png" alt="" />
            </div>
            <div className="flex-none mr-5">
                <ul className="menu menu-horizontal px-1">
                    <li><a className=' text-3xl' target='_blank' href='http://localhost:3000/login'>เข้าสู่ระบบ</a></li>
                    {/* <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}