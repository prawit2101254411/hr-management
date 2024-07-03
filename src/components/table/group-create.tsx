"use client"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { createGroup } from "@/utils/action"
import { useModal } from "@/components/modal/provider"
import PositionCreate from "./position-Create"

interface props {
    id: number;
    Group: any;

}

export default function CreateGroupModal({ id, Group }: props) {
    // affil.forEach((Item:any,index:number) => {
    //     return {Item};
    // })
    const modal = useModal();
    return (
        <button
            type="button"
            onClick={() => modal?.show(<FormCreate id={id} Group={Group} />)}
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

const FormCreate = ({ id, Group }: props) => {
    // console.log(Group)
    const modal = useModal();
    return (
        <div className="mx-auto w-full max-w-[700px] bg-white border-2 rounded-xl">
            <form className="px-8 pt-6  bg-white rounded bg-opacity-50"
                action={async (data: FormData) => {
                    createGroup(data)
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
                <input name="AffilId" hidden value={id} />
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label className="flex left-0 text-3xl  mb-2 font-bold text-gray-700" form='Groupname'>
                            ชื่อกลุ่ม
                        </label>
                        <textarea
                            className="w-[630px] h-[100px] text-sm pl-2 pt-2 rounded-lg leading-tight bg-white text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="Groupname"
                            name='Groupname'
                            placeholder="กลุ่ม..."
                            required
                        />
                    </div>
                </div>
                <FormButton>
                    <div className='flex items-center justify-center p-2 text-center border-2 rounded-lg hover:bg-blue-500 hover:text-white'>
                        บันทึก
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" flex ml-2 mt-1 bi bi-floppy" viewBox="0 0 16 16">
                            <path d="M11 2H9v3h2z" />
                            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                        </svg>
                    </div>
                </FormButton>
            </form>
            <form className=" rounded-lg mt-8 bg-white ">
                <h3 className=" text-left text-2xl pl-5 font-medium text-gray-900">ตารางกลุ่ม</h3>
                <table className=" w-full h-full border rounded-md bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ลำดับ</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ชื่อกลุ่ม</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">จำนวนสมาชิก</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {Group.map(({ id, Groupname, User, Position }: any, index: number) =>
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-4 px-7">{index + 1}</td>
                                <th className="flex items-center justify-center gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="text-sm">
                                        <div>{Groupname}</div>
                                    </div>
                                </th>
                                <td className=" py-4">
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                            {User.length}
                                        </span>
                                    </span>
                                </td>
                                <td>
                                    <span className="flex gap-2 item-canter justify-center">
                                        <PositionCreate id={id} Position={Position} />
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
