import React from 'react'
import { useModal } from '../modal/provider'
import { editExpenses } from '@/utils/action';
import { toast } from 'sonner';
import { FormButton } from '../FormButton';
import { editRevenues } from '@/utils/action';
import { redirect } from 'next/navigation';
import { error } from 'console';

var numeral = require('numeral');

type Props = {
    salary: any;
    Reques: any;
}

export default function SalaryForm({ salary, Reques }: Props) {
    if(salary == "" || salary == undefined || salary == null){
        redirect("/app/tableuser");
    }

    const Ex = salary.Expenses;
    const Re = salary.Revenues;
    // console.log(Ex)

    const ExTotal = (JSON.parse(Ex.AFCM) + JSON.parse(Ex.CPS) + JSON.parse(Ex.GHBank) + JSON.parse(Ex.GPF) + JSON.parse(Ex.IslamicBank) + JSON.parse(Ex.Krungthai) + JSON.parse(Ex.Nakho) + JSON.parse(Ex.PAOC) + JSON.parse(Ex.PAOF) + JSON.parse(Ex.PHSC) + JSON.parse(Ex.Salarydropped) + JSON.parse(Ex.SavingsBank) + JSON.parse(Ex.Student) + JSON.parse(Ex.TeachersCoop) + JSON.parse(Ex.Welfarefund) + JSON.parse(Ex.WiratCoop) + JSON.parse(Ex.incometax) + JSON.parse(Ex.socialsecurity))
    const ReTotal = (JSON.parse(Re.BrokenGPF) + JSON.parse(Re.Childtuition) + JSON.parse(Re.Compensation) + JSON.parse(Re.Houserent) + JSON.parse(Re.Medicalexpenses) + JSON.parse(Re.Posallowan) + JSON.parse(Re.costofliving) + JSON.parse(Re.fullsalary) + JSON.parse(Re.obtainback) + JSON.parse(Re.salarys) + JSON.parse(Re.tax))
    const formattedExTotal = numeral(ExTotal).format('0,0.00');
    const formattedReTotal = numeral(ReTotal).format('0,0.00');
    // console.log(ExTotal)


    const modal = useModal();
    return (
        <div className="mx-auto w-full max-w-[550px] h-[300px] bg-white border-2 rounded-xl text-black">
            <div>
               <h1  className=' text-3xl font-semibold mt-5 ml-5'>จัดการเงินเดือน</h1>
                <div className=' flex items-center justify-center mt-10'>
                    <h1>รายรับรวม <a className=' text-blue-500'>{formattedReTotal}</a> บาท</h1>
                </div>
                <div className=' flex items-center justify-center p-3'>
                    <h1>รายจ่ายรวม <a className=' text-red-500'>{formattedExTotal}</a> บาท</h1>
                </div>
                <div className=' text-center '>
                    <h1><a className='text-red-500 '>{Reques?.coment}</a> {JSON.stringify(Reques?.date)}</h1>
                </div>
            </div>

            <form className=" flex py-3 px-9 items-center justify-center">
                <div className='p-3'>
                    <button
                        className='  hover:bg-green-500 hover:text-white border-2 rounded-lg p-3'
                        type="button"
                        onClick={() => modal?.show(<FormRevenue Revenue={salary.Revenues} />)}
                    >
                        ตารางรายรับ
                    </button>
                </div>
                <div className='p-3'>
                    <button
                        className=' hover:bg-red-500 hover:text-white border-2 rounded-lg p-3'
                        type="button"
                        onClick={() => modal?.show(<FormExpenses expenses={salary.Expenses} />)}
                    >
                        ตารางรายจ่าย
                    </button>
                </div>
            </form>
        </div>
    )
}

const FormRevenue = ({ Revenue }: any) => {
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

    // console.log(BrokenGPS)
    const modal = useModal();
    return (
        <>
            <div className=" mx-auto w-full max-w-[700px] max-h-[600px] overflow-auto bg-white border-2 rounded-xl ">
                <form className="py-6 px-9"
                    action={async (data: FormData) => {
                        editRevenues(data)
                            .then(async (res) => {
                                if (res?.error) {
                                    toast.error(res.error);
                                } else {
                                    // modal?.hide();
                                    toast.success(`แก้ไขข้อมูลสำเร็จ!`);
                                }
                            })
                            .catch((err: Error) => toast.error(err.message))
                    }}
                    method="POST"

                >
                    <input name="id" hidden value={Revenue.id} />
                    <div className="rounded-lg bg-white p-3.5 lg:p-6  ">
                        <h3 className=" text-left pl-5 font-bold text-2xl text-gray-900 rounded-xl">ตารางรายรับ</h3>
                        <table className=" w-full h-full border-2 rounded-xl  text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
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
                                            <div>กองทุนบำเหน็จบำนาญข้าราชการ</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <input defaultValue={BrokenGPS} name='BrokenGPF' type='text' required className="inline-flex items-center w-20 gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Childtuition} name='Childtuition' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Compensation} name='Compensation' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Houserent} name='Houserent' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Medicalexpenses} name='Medicalexpenses' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Posallowan} name='Posallowan' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={costofliving} name='costofliving' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={fullsalary} name='fullsalary' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={obtainback} name='obtainback' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={salarys} name='salarys' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={tax} name='tax' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=' flex items-center justify-center'>
                        <FormButton>
                            <a className='flex border-2 px-10 py-2  rounded-lg hover:bg-blue-500 hover:text-white'>
                                บันทึก
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" ml-2 bi bi-floppy" viewBox="0 0 16 16">
                                <path d="M11 2H9v3h2z" />
                                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                            </a>
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    )
}


const FormExpenses = ({ expenses }: any) => {
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

    const modal = useModal();
    return (
        <>

            <div className=" mx-auto w-full max-w-[700px] max-h-[600px] overflow-auto bg-white border-2 rounded-xl ">
                <form className="py-6 px-9"
                    action={async (data: FormData) => {
                        editExpenses(data)
                            .then(async (res) => {
                                if (res?.error) {
                                    toast.error(res.error);
                                } else {
                                    // modal?.hide();
                                    toast.success(`แก้ไขข้อมูลสำเร็จ!`);
                                }
                            })
                            .catch((err: Error) => toast.error(err.message))
                    }}
                    method="POST"

                >
                    <input name="id" hidden value={expenses.id} />
                    <div className="rounded-lg bg-white p-3.5 lg:p-6">
                        <h3 className=" text-left pl-5 font-medium text-2xl text-gray-900">ตารางรายจ่าย</h3>
                        <table className=" w-full h-full border-collapse border-2 text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
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
                                            <input defaultValue={AFCM} name='AFCM' type='text' step='0.00' min='0.00' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">2</td>
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div>ประกันชีวิต/ชพค.</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <input defaultValue={CPS} name='CPS' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={GHBank} name='GHBank' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={GPF} name='GPF' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={IslamicBank} name='IslamicBank' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">8</td>
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div>ธนาคาร ธอส</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <input defaultValue={Krungthai} name='Krungthai' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4">9</td>
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="text-sm">
                                            <div>กรุงไทย</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <input defaultValue={Nakho} name='Nakho' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={PAOC} name='PAOC' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={PAOF} name='PAOF' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={PHSC} name='PHSC' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Salarydropped} name='Salarydropped' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={SavingsBank} name='SavingsBank' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Student} name='Student' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={TeachersCoop} name='TeachersCoop' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={Welfarefund} name='Welfarefund' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={WiratCoop} name='WiratCoop' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={incometax} name='incometax' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
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
                                            <input defaultValue={socialsecurity} name='socialsecurity' type='text' className="inline-flex items-center w-20  gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=' flex items-center justify-center'>
                        <FormButton>
                            <a className=' flex border hover:bg-blue-500 hover:text-white px-10 py-2 rounded-lg'>
                                บันทึก
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className=" ml-2 mt-0 bi bi-floppy" viewBox="0 0 16 16">
                                <path d="M11 2H9v3h2z" />
                                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                            </a>
                        </FormButton>
                    </div>
                </form>
            </div>
        </>
    )
}
