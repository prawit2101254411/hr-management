"use client"
import { useModal } from "./modal/provider";
import { FormButton } from "./FormButton";
import { edit } from "@/utils/action";
import { toast } from "sonner";
import { useEffect } from "react";

type props = {
  session: any;
  user: any;
}

export default function Profile({ session, user }: props) {
  // console.log(user)
  const modal = useModal();
  return (
    <div className=" bg-white p-2 h-full w-full rounded-xl">
      <div className=" border-2 bg-white py-5 h-[350px] rounded-2xl">
        <span className=" mt-28 ml-5 inline-block">
          <img className="rounded-3xl" src={user?.Avatar} alt="Trulli" width="200" height="200" />
        </span>
        <div className="ml-1 inline-block">
          <h1 className=" font-bold text-3xl text-black">{user.fname} {user.lname}</h1>
          <h1 className=" text-blue-600">{user.level}</h1>
        </div>
        <div className="group inline-block float-right mr-4">
          <button type="button" onClick={() => modal?.show(<FormEditUser user={user} />)} >
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear hover:text-blue-600" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
              </svg>
            </a>
            <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-full rounded mt-2">
              จัดการข้อมูลส่วนตัว
            </div>
          </button>
        </div>
      </div>
      <div className="border-2 float-left mt-5 w-[560px] bg-white p-5  rounded-2xl">
        <span>
          {user.Affil && <h1 className=" text-black"><a href="" className=" text-blue-700 font-bold text-xl">สังกัด</a> {user.Affil.Affilname}</h1>}
          {user.Groups && <h1 className=" text-black"><a href="" className=" text-green-700 font-bold text-xl">กลุ่ม</a> {user.Groups.Groupname}</h1>}
        </span>
      </div>
      <div className="border-2 mt-5 ml-5 p-5 bg-white inline-block rounded-2xl max-w-[510px] h-full">
        <div className=" text-black">
          The weather is very good today. But there is still very strong and hot sun. The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun. I want to go back to my room now. The weather is very good today. But there is still very strong and hot sun. I want to go back to my room now.
          The weather is very good today. But there is still very strong and hot sun. The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun.The weather is very good today. But there is still very strong and hot sun. I want to go back to my room now. The weather is very good today. But there is still very strong and hot sun. I want to go back to my room now.
        </div>
      </div>
    </div>
  );
}
const FormEditUser = ({ user }: any) => {
  const modal = useModal();
  return (
    <form className=" pt-10 p-20 w-[700px] h-full  border shadow-md overflow-auto mx-auto items-canter justify-center bg-white rounded-lg"
      method="POST"
      action={async (data: FormData) => {
        edit(data)
          .then(async (res) => {
            if (res?.error) {
              toast.error(res?.error);
            } else {
              modal?.hide();
              toast.success("บันทึกสำเร็จ");
            }
          })
          .catch((err: Error) => toast.error(err.message))
      }}
    >
      <div className=" w-full">
        <input name='id' defaultValue={user?.id} hidden />
        <h1 className=' flex items-center justify-center text-xl font-extrabold'>ข้อมูลผู้ใช้</h1><br />
        <div className=' flex items-center justify-center'>
          <img
            className="rounded-full object-cover object-center"
            src={user?.Avatar} alt="Trulli" width="200" height="200"
          />
        </div><br />
        <div className="mb-4">
          <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="URL">
            ที่อยู่รูปภาพ
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="Avatar"
            type="text"
            name='Avatar'
            defaultValue={user?.Avatar}
            placeholder="URL"
          />
        </div>

        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='fname'>
              ชื่อ
            </label>
            <input className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
              name='fname'
              type='text'
              defaultValue={user?.fname}
              placeholder="ชื่อ"
            />
          </div>
          <div className="md:ml-2">
            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="lname">
              นามสกุล
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="lname"
              type="text"
              name='lname'
              defaultValue={user?.lname}
              placeholder="นามสกุล"
            />
          </div><hr />
          <div className='pl-5'>
            <label form="sex" className="flex left-0 mb-2 text-sm font-medium text-gray-900 dark:text-white">เพศ</label>
            <select
              defaultValue={user?.sex}
              name='sex'
              id="sex"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {/* <option value={Sex.MAN}>ชาย</option>
              <option value={Sex.WOMAN}>หญิง</option> */}
            </select>

          </div>
        </div>
        <div className="mb-4">
          <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="email">
            อีเมล
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name='username'
            defaultValue={user?.username}
            placeholder="username"
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label className="flex left-0  mb-2 text-sm font-bold text-gray-700" form='u_num'>
              รหัสประจำตัวประชาชน
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="u_num"
              type="tel"
              name='u_num'
              defaultValue={user?.u_num}
              pattern="[0-9]{5}-[0-9]{2}-[0-9]{3}-[0-9]{3}"
              placeholder="xxxxx-xx-xxx-xxx"
            />
          </div>
          <div className="md:ml-2">
            <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="phone">
              เบอร์โทร
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name='phone'
              defaultValue={user?.phone}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="xxx-xxx-xxxx"
            />
          </div>
        </div>

        <div className="relative max-w-sm">
          <label className="flex left-0 pt-0 font-bold text-gray-700" form='birthday'>
            วันเดือนปีเกิด
          </label>
          <input
            type="date"
            id='birthday'
            name='birthday'
            defaultValue={user?.birthday}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        </div>
        {/* <div className=" mt-3">
          <input type="file" name="file" id="file" className=" w-60 h-10 bg-slate-400" />
        </div> */}

        <h1 className='pl-5 font-extrabold'>เปลี่ยนรหัสผ่าน</h1><br />
        <div className=' border p-5 bg-opacity-25 rounded-lg'>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="password">
                รหัสผ่าน
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name='password'
                defaultValue={user?.password}
                placeholder="******************"
              />
            </div>
            <div className="md:ml-2">
              <label className="flex left-0 mb-2 text-sm font-bold text-gray-700" form="c_password1">
                ยืนยันรหัสผ่าน
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="c_password"
                type="password"
                name='c_password'
                defaultValue={user?.password}
                placeholder="******************"
              />
            </div>
          </div>
        </div>
        <div className=' mt-10 flex items-center justify-center'>
          <FormButton>
            <div className=" flex items-center justify-center text-center w-40 h-10 font-bold border rounded-xl hover:bg-blue-500 hover:text-white  focus:shadow-outline">
              บันทึก
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" ml-2 bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
            </div>
          </FormButton>
        </div>
      </div>
    </form>
  )
}