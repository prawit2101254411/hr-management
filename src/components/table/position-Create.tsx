"use client"
import React from 'react'
import { useModal } from '../modal/provider';
import { FormButton } from '../FormButton';
import { createPosition } from '@/utils/action';
import { toast } from 'sonner';

type Props = {
  id: number;
  Position: any;
}

export default function PositionCreate({ id, Position }: Props) {
  const modal = useModal();
  return (
    <button
      type="button"
      onClick={() => modal?.show(<FormCreate id={id} Position={Position} />)}
    >
      <a x-data="{ tooltip: 'Edite' }" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          x-tooltip="tooltip">
          <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </a>

    </button>
  );
}
const FormCreate = ({ id, Position }: Props) => {

  const modal = useModal();
  return (
    <div className="mx-auto w-full max-w-[700px] bg-white border-2 rounded-xl">
      <form className="px-8 bg-white rounded bg-opacity-50"
        action={async (data: FormData) => {
          createPosition(data)
            .then(async (res: any) => {
              if (res.error) {
                toast.error(res.error);
              } else {
                // modal?.hide();
                toast.success(`Successfully deleted!`);
              }
            })
            .catch((err: Error) => toast.error(err.message))
        }}
        method="POST"
      >
        <h3 className=" mt-5 text-left font-bold text-3xl text-gray-900">ตำแหน่ง</h3>
        <input name="Groupid" hidden value={id} />
        <div className="flex flex-col mb-4 md:flex md:justify-between">
          <div className=" flex mb-4 md:mr-2 md:mb-0">
            <div className=' p-3'>
              <input
                className="w-[280px] h-[40px] pl-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="Posnames"
                type="text"
                name='Posnames'
                placeholder="ตำแหน่ง"
                required
              />
            </div>
            <div className='p-3'>
              <input
                className=" w-[280px] h-[40px] pl-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="Codes"
                type="number"
                name='Codes'
                placeholder="รหัสตำแหน่ง (ตัวเลข 0-9)"
                required
              />
            </div>
          </div>
          <div className=" p-3 mb-4 md:mr-2 md:mb-0">
            <input
              className="w-[280px] h-[40px] pl-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="levels"
              type="text"
              name='levels'
              placeholder="ระดับ"
              required
            />
          </div>
          <div className=" p-3 mb-4 md:mr-2 md:mb-0">
            <input
              className="w-[280px] h-[40px] pl-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="salarys"
              type="number"
              name='salarys'
              placeholder="เงินเดือน (0.00 บาท)"
              required
            />
          </div>
        </div>
        <FormButton>
          <div className=' flex p-2 ml-2.5 item-canter justify-center text-center border-2 rounded-lg hover:bg-blue-500 hover:text-white'>
            บันทึก
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" flex ml-2 mt-1 bi bi-floppy" viewBox="0 0 16 16">
              <path d="M11 2H9v3h2z" />
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
            </svg>
          </div>
        </FormButton>
      </form>
      <form className="mt-5 border bg-white ">
        <h3 className=" text-left mt-4 pl-5 font-medium text-2xl text-gray-900">ตารางตำแหน่ง</h3>
        <table className=" w-full rounded-md bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ลำดับ</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ชื่อตำแหน่ง</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ระดับ</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">เงินเดือน</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">จำนวนพนักงาน(คน)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {Position.map(({ id, Posnames, levels, salarys, User }: any, index: number) =>
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className=" gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div>{Posnames}</div>
                  </div>
                </td>
                <td className=" gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="text-sm">
                    <div>{levels}</div>
                  </div>
                </td>
                <td className=" px-5">
                  <span className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {salarys}
                    </span>
                  </span>
                </td>
                <td className=" flex items-center justify-center">
                  <span className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      {User.length}
                    </span>
                  </span>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </form>

    </div>

  )
}
