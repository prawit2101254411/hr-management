"use client"
import React, { useEffect, useState } from 'react'
import SalaryslipPdf from '../generatePDF/SalaryslipPdf';
import { useModal } from '../modal/provider';
import SalarycertificatePdf from '../generatePDF/SalarycertificatePdf';

var numeral = require('numeral');

var converter = require('number-to-words');

type Props = {
    salary: any;
    user: any;
    Request: any;
    RequesUserWorkcertificate: any;
}

export default function SalaryTableUser({ salary, user, Request, RequesUserWorkcertificate }: Props) {

    let isConditionMet = ({ "Req": Request?.Status, "req": RequesUserWorkcertificate?.Status }); // เช่นให้กำหนดเป็น false เพื่อเริ่มต้น
    const [num, setnum] = useState("");
    const [nums, setnums] = useState("");
    const Num = Number(num);
    const Nums = Number(nums);
    const NumberMassesg = JSON.stringify(Num + Nums);
    // console.log(Request.Status)
    useEffect(() => {
        if (isConditionMet.Req == "true") {
            setnum("1")
        } else {
            setnum("0")
        }
        if (isConditionMet.req == "true") {
            setnums("1")
        } else {
            setnums("0")
        }
    },[isConditionMet])

    const modal = useModal();
    const Revenue = (salary?.Revenues);
    const expenses = (salary?.Expenses);

    const Ex = expenses;
    const Re = Revenue;

    const ExTotal = (Ex.AFCM + Ex.CPS + Ex.GHBank + Ex.GPF + Ex.IslamicBank + Ex.Krungthai + Ex.Nakho + Ex.PAOC + Ex.PAOF + Ex.PHSC + Ex.Salarydropped + Ex.SavingsBank + Ex.Student + Ex.TeachersCoop + Ex.Welfarefund + Ex.WiratCoop + Ex.incometax + Ex.socialsecurity)
    const ReTotal = (Re.BrokenGPF + Re.Childtuition + Re.Compensation + Re.Houserent + Re.Medicalexpenses + Re.Posallowan + Re.costofliving + Re.fullsalary + Re.obtainback + Re.salarys + Re.tax)
    const formattedReTotal = numeral(ReTotal).format('0,0.00');
    const formattedExTotal = numeral(ExTotal).format('0,0.00');

    const Total = (ReTotal - ExTotal);

    //ทศนิยมรายรับ
    const BrokenGPS = numeral(Revenue.BrokenGPF).format('0,0.00');
    const salarys = numeral(Revenue.salarys).format('0,0.00');
    const Posallowan = numeral(Revenue.Posallowan).format('0,0.00');
    const Compensation = numeral(Revenue.Compensation).format('0,0.00');
    const Childtuition = numeral(Revenue.Childtuition).format('0,0.00');
    const Houserent = numeral(Revenue.Houserent).format('0,0.00');
    const costofliving = numeral(Revenue.costofliving).format('0,0.00');
    const obtainback = numeral(Revenue.obtainback).format('0,0.00');
    const fullsalary = numeral(Revenue.fullsalary).format('0,0.00');
    const Medicalexpenses = numeral(Revenue.Medicalexpenses).format('0,0.00');
    const tax = numeral(Revenue.tax).format('0,0.00');
    //ทศนิยมรายจ่าย
    const AFCM = numeral(expenses.AFCM).format('0,0.00');
    const CPS = numeral(expenses.CPS).format('0,0.00');
    const incometax = numeral(expenses.incometax).format('0,0.00');
    const GPF = numeral(expenses.GPF).format('0,0.00');
    const Student = numeral(expenses.Student).format('0,0.00');
    const GHBank = numeral(expenses.GHBank).format('0,0.00');
    const Krungthai = numeral(expenses.Krungthai).format('0,0.00');
    const Nakho = numeral(expenses.Nakho).format('0,0.00');
    const SavingsBank = numeral(expenses.SavingsBank).format('0,0.00');
    const PHSC = numeral(expenses.PHSC).format('0,0.00');
    const PAOC = numeral(expenses.PAOC).format('0,0.00');
    const Welfarefund = numeral(expenses.Welfarefund).format('0,0.00');
    const PAOF = numeral(expenses.PAOF).format('0,0.00');
    const TeachersCoop = numeral(expenses.TeachersCoop).format('0,0.00');
    const IslamicBank = numeral(expenses.IslamicBank).format('0,0.00');
    const socialsecurity = numeral(expenses.socialsecurity).format('0,0.00');
    const Salarydropped = numeral(expenses.Salarydropped).format('0,0.00');
    const WiratCoop = numeral(expenses.WiratCoop).format('0,0.00');

    return (
        <div className=' flex flex-col'>
            <div className=' mx-auto  w-full h-full overflow-auto bg-white border-2 rounded-xl'>
                <div className='flex items-center justify-center p-2 pt-5'>
                    <h1 className=' font-bold text-2xl'>รายรับรวม <a className=' text-green-700'>{formattedReTotal}</a> บาท</h1>
                </div>
                <div className='flex items-center justify-center'>
                    <h1>รายจ่ายรวม <a className=' text-red-700'>{formattedExTotal}</a> บาท</h1>
                </div>
                <div className='right-0 ml-5 inline-block'>
                    <div className=' flex items-center justify-center '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                        </svg>
                    </div>
                </div>
                <div className=' ml-5  inline-block'>
                    <button onClick={() => modal?.show(<SalarycertificatePdf RequesUserWorkcertificate={RequesUserWorkcertificate} Request={Request} salarys={salarys} user={user} ExTotal={ExTotal} ReTotal={ReTotal} Total={Total} NewpositionUser={user.NewpositionUser} />)}>
                        {NumberMassesg == "2" && 
                        <span>
                            <span className=' text-xl hover:text-blue-500 hover:text-2xl font-semibold'>
                                ปริ้นหนังสือรับรองเงินเดือน
                            </span>
                            <span className=' hover:shadow-md ml-2 text-red-500 border-2 rounded-md p-1 text-lg'>
                                {NumberMassesg}
                                <span className=' text-red-500 text-sm'>
                                    แจ้งเตือน!
                                </span>
                            </span>
                        </span>}
                        
                        {NumberMassesg == "1" && 
                        <span>
                            <span className=' text-xl hover:text-blue-500 hover:text-2xl font-semibold'>
                                ปริ้นหนังสือรับรองเงินเดือน
                            </span>
                            <span className='hover:shadow-md ml-2 text-red-500 border-2 rounded-md p-1 text-xl'>
                                {NumberMassesg}
                                <span className=' text-red-500 text-sm'>
                                    แจ้งเตือน!
                                </span>
                            </span>
                        </span>}
                        {NumberMassesg == "0" && <span>
                            <span className=' hover:text-blue-500 hover:text-xl'>
                                ปริ้นหนังสือรับรองเงินเดือน
                            </span>
                        </span>}
                    </button>
                </div>
                <div className='ml-5 py-2 hover:text-blue-500 hover:text-xl inline-block'>
                    <SalaryslipPdf user={user} ExTotal={ExTotal} ReTotal={ReTotal} Total={Total} />
                </div>
            </div>
            <div className=' pt-5'>
                <div className=" float-left py-5 px-6 mx-auto w-full max-w-[500px] max-h-[600px] overflow-auto border-2 rounded-xl">
                    <form className="py-4" >
                        <div className="rounded-lg bg-white ">
                            <h3 className=" text-left font-medium text-gray-900">ตารางรายรับ</h3>
                            <table className=" w-full h-full border-collapse bg-white bg-opacity-25 text-left text-sm text-gray-500">
                                <thead className=" bg-slate-300 bg-opacity-25">
                                    <tr>
                                        <th scope="col" className="px-3 py-4 font-medium text-gray-900">ลำดับ</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">ชื่อรายการ-รายจ่าย</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">จำนวนเงิน</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-red-100 border-t border-gray-100 ">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">1</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>กองทุนบำเหน็จบำนาญข้าราชการ</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {BrokenGPS}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">2</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ค่าเล่าเรียนบุตร</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {Childtuition}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">3</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ค่าสินไหมทนแทน</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {Compensation}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">4</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ค่าเช่าบ้าน</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {Houserent}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">5</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ค่ารักษาพยาบาล</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {Medicalexpenses}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">6</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>เงินประจำตำแหน่ง</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {Posallowan}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">7</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ค่าครองชีพ</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {costofliving}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">8</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>เงินเดือนเต็มจำนวน</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {fullsalary}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">9</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ตกเบิก</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {obtainback}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">10</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>เงินเดือน</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {salarys}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">11</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ภาษี</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" >
                                                    {tax}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>

                <div className=" float-right mx-auto w-full max-w-[500px] max-h-[600px] overflow-auto border-2 rounded-xl">
                    <form className="py-4" >
                        <div className="rounded-lg bg-white p-3.5 lg:p-6">
                            <h3 className=" text-left pl-5 font-medium text-gray-900">ตารางรายจ่าย</h3>
                            <table className=" w-full h-full border-collapse bg-white bg-opacity-25 text-left text-sm text-gray-500">
                                <thead className=" bg-slate-300 bg-opacity-25">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">ลำดับ</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">ชื่อรายการ-รายจ่าย</th>
                                        <th scope="col" className="px-6 py-4 font-medium text-gray-900">จำนวนเงิน</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">1</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ภาษีเงินได้</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {AFCM}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">3</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>กสจ.</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {CPS}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">5</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ชพส.</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {GHBank}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">6</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>กยศ.</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {GPF}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">7</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ชพค</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {IslamicBank}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">8</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>กรุงไทย</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {Krungthai}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">9</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ธนาคาร ธอส</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {Nakho}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">10</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ณกส</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {PAOC}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">11</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ออมสิน</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {PAOF}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">12</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>สหกรณ์ออมทรัพย์ครู</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {PHSC}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">14</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>สหกรณ์อบจ</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {Salarydropped}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">15</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ปกครอง</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {SavingsBank}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">16</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>กองทุน อบจ</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {Student}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">18</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ธนาคารอิสลาม</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {TeachersCoop}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">19</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>ปก.สังคม</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {Welfarefund}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">20</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>เงินเดือนตกเบิก</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {WiratCoop}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">21</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>สหกรณ์วิรัช</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {incometax}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4">22</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="text-sm">
                                                <div>เงินสงเคราะห์ สมาชิกสหกรณ์</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    {socialsecurity}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}