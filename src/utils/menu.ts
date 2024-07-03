
export type Item = {
    name: string;
    slug: string;
    description?: string;
  };
  
  export const menus: { name: string; Description:string; items: Item[] }[] = [
    {
      name: '',
      Description:'',
      items: [
        {
          name: 'หน้าหลัก',
          slug: 'app/profile/',
          description: '',
        },
        // {
        //   name: 'แก้ไขข้อมูลส่วนตัว',
        //   slug: 'app/edituser/',
        //   description: '',
        // },
      ],
    },
    {
      name: 'เงินเดือน',
      Description:'',
      items: [
        {
          name: 'ตารางเงินเดือน (รายรับ-รายจ่าย)',
          slug: 'app/salary/',
          description: '',
        },

      ],
    },
    
  ];
  
  export const menuhr: { name: string; Description:string; items: Item[] }[] = [
    {
      name: '',
      Description:'ข้อมูลส่วนตัว',
      items: [
        {
          name: 'หน้าหลัก',
          slug: 'app/profile',
          description: 'แสดงข้อมูลส่วนตัว พร้อมทั้งแก้ไขข้อมูล',
        },
      ],
    },
    {
      name: 'รายชื่อ',
      Description:'ตารางข้อมูล',
      items: [
        {
          name: 'จัดการสมาชิก',
          slug: 'app/tableuser',
          description: 'รายชื่อผู้ใช้งานทั้งหมด',
        },
        {
          name: 'จัดการสังกัด-กลุ่ม',
          slug: 'app/tableAffil-Group/',
          description: 'ตารางสังกัด-กลุ่ม',
        },
        {
          name: 'บันทึก การเข้าถึงข้อมูล',
          slug: 'app/Logs/',
          description: 'แสดงรายการผู้ที่ปริ้นหนังสือรับรองเงินเดือน',
        },
      ],
    },
  ];
