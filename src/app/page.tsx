import React from "react"
import Slideshow from "@/components/homepageUi/SlideShow"
import Requastpage from "@/components/homepageUi/Requast"
import NavbarPage from "@/components/homepageUi/NavbarPage"
import Footer from "@/components/homepageUi/Footer"

export default function Page() {
  // Hello
  return (
    <div>
      <div className=" fixed w-screen h-screen">
      <img className="" src="/images/image5.jpg" alt="" />
      </div>
      <div className="w-screen h-[150px]">
        <NavbarPage />
      </div>
        <Slideshow/>
      <div className=" flex flex-wrap relative">
        <div className=" flex flex-col w-[800px] h-full py-40 bg-slate-50">
        <img className=" max-w-[200px] max-h-[200px]  ml-28  " src="/icon/icon5.png" alt="" />
          <div className=" pl-16 pr-14">
          <h1 className=" text-xl font-bold">HR management (Human Resources Management)</h1><br />
          <p>การบริหารทรัพยากรมนุษย์ เป็นสาขางานที่เกี่ยวข้องกับการจัดการและพัฒนาทรัพยากรมนุษย์ในองค์กรหรือองค์กรธุรกิจต่าง ๆ ซึ่งเน้นไปที่การบริหารจัดการกับบุคลากรในด้านต่าง ๆ เช่น การจัดการแรงงาน การสรรหาและคัดเลือกพนักงาน การพัฒนาและฝึกอบรมบุคลากร การบริหารจัดการประสิทธิภาพการทำงาน การบริหารจัดการความรู้และทักษะ การจัดทำนโยบายและกฎระเบียบต่าง ๆ เพื่อให้ทรัพยากรมนุษย์ใช้ประโยชน์สูงสุดและมีผลต่อการดำเนินงานขององค์กรอย่างเป็นระบบและมีประสิทธิภาพสูงสุดได้โดยมีการใช้ทรัพยากรที่มีอยู่ในองค์กรอย่างเหมาะสมและประสิทธิภาพ นอกจากนี้ HR management </p>
          </div>
        </div>
      <Requastpage/>
      </div>
      <Footer />
    </div>
  )
}
