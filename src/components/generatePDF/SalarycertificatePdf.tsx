'use client'
import React, { useState } from 'react'
import { RefreshRequesUser, RequesSalary } from '@/utils/action'
import { format, parseISO } from 'date-fns';
import jsPDF from 'jspdf';
import { font } from './THSarabun-normal';
import { fontbold } from './THSarabun Bold-bold'
import autoTable from 'jspdf-autotable';
import './thaibath'
import { ArabicNumberToText } from './thaibath';
import { useModal } from '../modal/provider';
import { toast } from "sonner"
import { RequesUserSalary } from '@/utils/action';
import { error } from 'console';
import { RequesUserWorkcertificates } from '@/utils/action';
import { RefreshRequesUserWorkcertificate } from '@/utils/action';

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
  salarys: number;
  NewpositionUser: any;
  Request: any;
  RequesUserWorkcertificate:any;
}

export default function SalarycertificatePdf({ user, ExTotal, ReTotal, Total, salarys, NewpositionUser, Request,RequesUserWorkcertificate }: Props) {
  // console.log(Request)
  const dates = NewpositionUser.dateUpdate;
  const date = new Date(dates)
  const Start = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const date2 = new Date(formattedDate)
  const current = date2.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // console.log(current)
  //ตัวแปล
  const fname = user.fname;
  const lname = user.lname;
  const Affil = user.Affil.Affilname;
  const Group = user.Groups.Groupname;
  const Position = user.Position.Posnames;
  const Poscord = user.Position.Codes;

  //โอนเข้าธนาคาร
  const Totals = numeral(Total).format('0,0.00');
  const Totalss = numeral(Totals).format('');
  const total = ArabicNumberToText(Totalss)

  const handleCertificatePdf = async () => {
    const doc = new jsPDF();
    const image = new Image();
    image.src = "/imagePDF/123.png";


    let width = doc.internal.pageSize.width;
    //รูปภาพ
    doc.addImage(image, "PNG", 92.5, 25, 25, 30);

    // font Thai
    doc.addFileToVFS("MyFont.ttf", fontbold);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    //ตัวอักษร
    doc.text(`หนังสือรับรองเงินเดือน`, width / 2, 65, { align: 'center' });
    //ตัวอักษร
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    doc.text(`ที่ มค 51004/`, 30, 75,);
    autoTable(doc, {
      startY: 70,
      margin: 108,
      body: [[`${Affil}  ${Group}`]],
      styles: {
        font: 'MyFont',
        fontSize: 16,
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        halign: 'center'
      },
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 80 },
      },
    });
    doc.text(`วันที่ ${current}`, 95, 95,);

    autoTable(doc, {
      startY: 100,
      body: [[
        `          หนังสือสำคัญฉบับนี้แสดงว่า นาย-นางสาว ${fname} ${lname} ตำแหน่ง ${Position} เลขที่ตำแหน่ง ${Poscord} สังกัด${Affil} สำนัก${Group} ได้รับเงินอัตราเดือนละ ${salarys}.- บาท รวมเป็นเงิน ${Totals}.- บาท (${total}) จริง`
      ], [`          จึงได้ออกหนังสือสำคัญฉบับนี้ไว้เพื่อเป็นหลักฐาน`]],
      styles: {
        font: 'MyFont',
        fontSize: 16,
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        halign: "left"
      },
      theme: "plain",
      margin: 30,
      columnStyles: {
        0: { cellWidth: 160 },
      }
    });
    doc.text(`(นาย ${RequesUserWorkcertificate.Hrname})`, width / 2, 175, { align: 'center' });
    doc.text(`ผู้อำนวยการกองคลัง`, width / 2, 183, { align: 'center' });
    doc.text(`ฝ่ายการเงิน โทร 0888888888`, 20, 270,);

    doc.save("test.pdf");

  }
  const CertificateofEmployment = async () => {
    const doc = new jsPDF();
    const image = new Image();
    image.src = "/imagePDF/123.png";


    let width = doc.internal.pageSize.width;
    //รูปภาพ
    doc.addImage(image, "PNG", 92.5, 25, 25, 30);

    // font Thai
    doc.addFileToVFS("MyFont.ttf", fontbold);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    //ตัวอักษร
    doc.text(`หนังสือรับรองการทำงาน`, width / 2, 65, { align: 'center' });
    //ตัวอักษร
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    doc.text(`ที่ มค 51004/`, 30, 75,);
    autoTable(doc, {
      startY: 70,
      margin: 115,
      body: [[`${Affil}  ${Group}`]],
      styles: {
        font: 'MyFont',
        fontSize: 16,
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        halign: 'center'
      },
      theme: "plain",
      columnStyles: {
        0: { cellWidth: 80 },
      },
    });

    autoTable(doc, {
      startY: 90,
      body: [[
        `          หนังสือสำคัญฉบับนี้แสดงว่า นาย-นางสาว ${fname} ${lname} ได้ปฏิบัตรงานที่ ${Affil} สำนัก${Group} โดยปฏิบัตรงานในตำแหน่ง ${Position} เลขที่ตำแหน่ง ${Poscord} ได้เริ่มปฏิบัตรงานตั้งแต่วันที่ ${Start} จนถึงวันที่ ${current} (ชื่อหน่วยงานหรือบุคคล)/************ขอรับรองว่า นาย/นาง/นางสาว/ ${fname} เป็นพนักงานของ ${Affil}`
      ], [`          ขอรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ`]],
      styles: {
        font: 'MyFont',
        fontSize: 16,
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineColor: [0, 0, 0],
        halign: "left"
      },
      theme: "plain",
      margin: 25,
      columnStyles: {
        0: { cellWidth: 170 },
      }
    });
    doc.text(`ลงชื่อ ${Request.Hrname}ผู้รับรอง`, width / 2, 167, { align: 'center' });
    doc.text(`(นาย ${Request.Hrname})`, width / 2, 175, { align: 'center' });
    doc.text(`ตำแหน่ง/***********`, width / 2, 183, { align: 'center' });
    // doc.text(`ฝ่ายการเงิน โทร 0888888888`, 20, 270,);

    doc.save("test.pdf");

  }

  const [CheckDatas1, setData1] = useState();
  const [CheckDatas2, setData2] = useState();
  const [CheckDatas3, setData3] = useState();

  const CheckData1 = (e: any) => {
    const check = e.target.checked;
    setData1(check)
  }
  const CheckData2 = (e: any) => {
    const check = e.target.checked;
    setData2(check)
  }
  const CheckData3 = (e: any) => {
    const check = e.target.checked;
    setData3(check)
  }
  const handleNext = () => {
    if (CheckDatas1){
      if (Request.Status == "true"){
        handleCertificatePdf();
        RefreshRequesUser(JSON.stringify({userId:user.id,Status:null,Hrname:"",data:formattedDate }))
        RequesSalary(JSON.stringify({Logsid:user.Logs.id,coment:"ปริ้นหนังสือรับรองเงินเดือน",date:formattedDate,nameUser:`${user.fname} ${user.lname}`}))
        modal?.hide();
      } else {
        RequesUserSalary(JSON.stringify({userId:user.id , text:"คำขออณุมัตรหนังสือรับรองเงินเดือน", Status:"false", data:formattedDate}))
        toast.error("เอกสารยังไม่ได้รับการอณุมัตร")
      }
    }
    if (CheckDatas2) {
      if (RequesUserWorkcertificate.Status == "true") {
        CertificateofEmployment();
        RefreshRequesUserWorkcertificate(JSON.stringify({userId:user.id,Status:null,Hrname:"",data:formattedDate }))
        RequesSalary(JSON.stringify({Logsid:user.Logs.id,coment:"ปริ้นหนังสือรับรองการทำงาน",date:formattedDate,nameUser:`${user.fname} ${user.lname}`}))
        modal?.hide();
      } else {
        RequesUserWorkcertificates(JSON.stringify({userId:user.id , text:"คำขออณุมัตรหนังสือรับรองการทำงาน", Status:"false", data:formattedDate}))
        toast.error("เอกสารยังไม่ได้รับการอณุมัตร")
      }
    }
    if (CheckDatas3) {
      toast.error(`เอกสารไม่พร้อมใช้งาน`);
    }
  }

  const modal = useModal();
  return (
    <form className='group w-[400px] h-[350px] bg-white rounded-md shadow-lg'>
      <h1 className=' text-xl mt-4 ml-5 font-medium'>การขอหนังสือรับรองเงินเดือน</h1>
      <div className=' ml-28 mt-10'>
        <input
          id="checkbox1"
          type="checkbox"
          onChange={(e) => CheckData1(e)}
          value={"1"}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out" />
        <label form="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">รับรองเงินเดือน {Request.Status == "true" && <span className=' text-green-500'>อนุมัตรเเล้ว!</span>}{Request.Status == "false" && <span className=' text-red-500'>รอการอนุมัตร!</span>}</label>
      </div>
      <div className=' ml-28 mt-5'>
        <input
          id="checkbox"
          type="checkbox"
          onChange={(e) => CheckData2(e)}
          value={"2"}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out" />
        <label form="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">รับรองอายุงาน {RequesUserWorkcertificate.Status == "true" && <span className=' text-green-500'>อนุมัตรเเล้ว!</span>}{RequesUserWorkcertificate.Status == "false" && <span className=' text-red-500'>รอการอนุมัตร!</span>}</label>
      </div>
      <div className=' ml-28 mt-5'>
        <input
          id="checkbox"
          type="checkbox"
          onChange={(e) => CheckData3(e)}
          value={"3"}
          className="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out" />
        <label form="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">รับรองอายุงาน,รับรองเงินเดือน</label>
      </div>

      <div className=' ml-32 mt-10 w-[150px] h-[50px] hover:bg-green-500 hover:text-white bg-white border rounded-lg '>
        <button 
          value={ReTotal}
          type='button'
          className='w-full h-full font-semibold'
        >
          {Request.Status == "true" &&<a onClick={handleNext}>พิมพ์</a>}
          {Request.Status == "false" &&<a onClick={handleNext}>รอการอนุมัตร</a>}
          {Request.Status == null &&<a onClick={handleNext}>ส่งคำขอ</a>}
        </button>
      </div>
    </form>
  )
}