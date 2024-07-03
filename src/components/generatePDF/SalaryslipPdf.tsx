"use client"
import React from 'react'
import Modal from '../modal'
import jsPDF from 'jspdf'
import { useModal } from '../modal/provider'
import { font } from './THSarabun-normal'
import autoTable from 'jspdf-autotable'
import { SalarySlipContent } from '@/utils/action'
import { format, parseISO } from 'date-fns';

// เก็บ Timestamp ปัจจุบัน
const currentTimestamp = new Date().getTime();

// ฟอร์แมต Timestamp เป็นวันที่
const formattedDate = format(currentTimestamp, 'yyyy-MM-dd HH:mm:ss');

var numeral = require('numeral');

type Props = {
  user: any;
  ReTotal: string;
  ExTotal: string;
  Total: number;
}

export default function SalaryslipPdf({ user, ExTotal, ReTotal, Total }: Props) {
  // console.log(Total)
  const modal = useModal();

  const handlePDF = () => {
    const doc = new jsPDF();

    const fname = [user.fname];
    const lname = [user.lname];

    const Affilname = [user.Affil.Affilname];

    //รายรับ
    const Revenues = (user.salary.Revenues);
    const RevenuesTotal = [numeral(ReTotal).format('0,0.00')];

    const BrokenGPF = [numeral(Revenues.BrokenGPF).format('0,0.00')];
    const Childtuition = [numeral(Revenues.Childtuition).format('0,0.00')];
    const Compensation = [numeral(Revenues.Compensation).format('0,0.00')];
    const Houserent = [numeral(Revenues.Houserent).format('0,0.00')];
    const Medicalexpenses = [numeral(Revenues.Medicalexpenses).format('0,0.00')];
    const Posallowan = [numeral(Revenues.Posallowan).format('0,0.00')];
    const costofliving = [numeral(Revenues.costofliving).format('0,0.00')];
    const fullsalary = [numeral(Revenues.fullsalary).format('0,0.00')];
    const obtainback = [numeral(Revenues.obtainback).format('0,0.00')];
    const salarys = [numeral(Revenues.salarys).format('0,0.00')];
    const tax = [numeral(Revenues.tax).format('0,0.00')];

    //โอนเข้าธนาคาร
    const Totals = [numeral(Total).format('0,0.00')];
    // console.log(Totals)
    //รายจ่าย
    const expenses = (user.salary.Expenses);
    const EcpensesTotal = [numeral(ExTotal).format('0,0.00')];

    const AFCM = [numeral(expenses.AFCM).format('0,0.00')];
    const CPS = [numeral(expenses.CPS).format('0,0.00')];
    const GHBank = [numeral(expenses.GHBank).format('0,0.00')];
    const GPF = [numeral(expenses.GPF).format('0,0.00')];
    const IslamicBank = [numeral(expenses.IslamicBank).format('0,0.00')];
    const Krungthai = [numeral(expenses.Krungthai).format('0,0.00')];
    const Nakho = [numeral(expenses.Nakho).format('0,0.00')];
    const PAOC = [numeral(expenses.PAOC).format('0,0.00')];
    const PAOF = [numeral(expenses.PAOF).format('0,0.00')];
    const PHSC = [numeral(expenses.PHSC).format('0,0.00')];
    const Salarydropped = [numeral(expenses.Salarydropped).format('0,0.00')];
    const SavingsBank = [numeral(expenses.SavingsBank).format('0,0.00')];
    const Student = [numeral(expenses.Student).format('0,0.00')];
    const TeachersCoop = [numeral(expenses.TeachersCoop).format('0,0.00')];
    const Welfarefund = [numeral(expenses.Welfarefund).format('0,0.00')];
    const WiratCoop = [numeral(expenses.WiratCoop).format('0,0.00')];
    const incometax = [numeral(expenses.incometax).format('0,0.00')];
    const socialsecurity = [numeral(expenses.socialsecurity).format('0,0.00')];

    // console.log(expenses)

    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.width;

    doc.text(` ${Affilname}`, width / 2, 10, { align: 'center' });
    doc.text("บัญชีจ่ายเงินประจำเดือน มกราคม 2567", width / 2, 17, { align: 'center' });
    doc.text(`ชื่อ ${fname} ${lname}`, width / 2, 24, { align: 'center' });

    autoTable(doc, {
      startY: 31,
      head: [['รายการรับ', 'จำนวนเงิน(บาท)', 'รายการจ่าย', 'จำนวนเงิน(บาท)']],
      body: [['ค่าเล่าเรียนบุตร', `${Childtuition}`, 'ภาษีเงินได้', `${incometax}`],
      ['ค่าสินไหมทนแทน', `${Compensation}`, 'กองทุนบำเหน็จบำนาญข้าราชการ', `${GPF}`],
      ['ค่าเช่าบ้าน', `${Houserent}`, `ชพส-ชพค`, `${CPS}`],
      ['ค่ารักษาพยาบาล', `${Medicalexpenses}`, 'กองทุนเงินให้กู้ยืมเพื่อการศึกษา.', `${Student}`],
      ['เงินประจำตำแหน่ง', `${Posallowan}`, 'ธนาคารแาคารสงเคราะห์', `${GHBank}`],
      ['ค่าครองชีพ', `${costofliving}`, 'กรุงไทย', `${Krungthai}`],
      ['เงินเดือนเต็มจำนวน', `${fullsalary}`, 'ณกส', `${Nakho}`],
      ['ตกเบิก', `${obtainback}`, 'ออมสิน', `${SavingsBank}`],
      ['เงินเดือน', `${salarys}`, 'สหกรณ์ออมทรัพย์ครู', `${TeachersCoop}`],
      ['ภาษี', `${tax}`, 'สหกรณ์ออมทรัพย์สาธารณะสุข', `${PHSC}`],
      ['กองทุนบำเหน็จบำนาญข้าราชการ', `${BrokenGPF}`, 'สหกรณ์อบจ', `${PAOC}`],
      ['', '', 'กองทุนสวัสดิการ', `${Welfarefund}`],
      ['', '', 'กองทุน อบจ', `${PAOF}`],
      ['', '', 'ธนาคารอิสลาม', `${IslamicBank}`],
      ['', '', 'ปก.สังคม', `${socialsecurity}`],
      ['', '', 'เงินเดือนตกเบิก', `${Salarydropped}`],
      ['', '', 'สหกรณ์วิรัช', `${WiratCoop}`],
      ['', '', 'เงินสงเคราะห์ สมาชิกสหกรณ์', `${AFCM}`],
      ],
      styles: { font: 'MyFont', fontSize: 16, textColor: [0, 0, 0], fontStyle: 'bold', },
      headStyles: { fillColor: [128, 128, 128], },
      theme: 'grid',
    });

    autoTable(doc, {
      startY: 220,
      body: [['', '', 'จ่าย', `${EcpensesTotal}`],
      ['', '', 'โอนเข้าบัญชีธนาคาร', `${Totals}`],
      ['รวมรับ', `${RevenuesTotal}`, 'รวมจ่าย', `${RevenuesTotal}`],
      ],
      styles: { font: 'MyFont', fontSize: 16, textColor: [0, 0, 0], fontStyle: 'bold', lineColor: [0, 0, 0] },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 31 },
        2: { cellWidth: 60 },
        3: { cellWidth: 31 },

      }
    });
    doc.save("a4.pdf");

    // const pdfURL = doc.output('datauristring');
    // window.open(pdfURL) //เปิดแท็ปใหม่

  }
  const handleSlip = (users: any) => {
    SalarySlipContent(JSON.parse(users));
  }
  return (
    <div className=' group'>
      <button type='button' onClick={handlePDF}>
        <a onClick={() => handleSlip(JSON.stringify({ logs:user.Logs , fname: user.fname, lname: user.lname, content: 'สลิปเงินเดือน', date: formattedDate }))}>
          สลิปเงินเดือน
        </a>
      </button>
      <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-25 text-white py-1 px-2 rounded mt-2">
        ปริ้นสลิปเงินเดือน
      </div>
    </div>
  )
}
