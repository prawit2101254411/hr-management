"use client"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { createAffil } from "@/utils/action"
import { useModal } from "@/components/modal/provider"


export default function CreateAffilModal() {
    const modal = useModal();
    return (
        <button
            onClick={() => modal?.show(<FormCreate />)}
            className=" mt-7"
        >
            <div className="flex  focus:outline-none bg-white hover:bg-gray-300 border-2 focus:ring-4 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2">
                เพิ่มสังกัด
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className=" pl-2 bi bi-journal-plus" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                    </svg>
                </a>
            </div>

        </button>
    );
}
const FormCreate = () => {
    const modal = useModal();
    return (
        <>
            <div className="mx-auto w-full max-w-[550px] bg-white border-2 rounded-xl">
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded bg-opacity-50"
                    action={async (data: FormData) => {
                        createAffil(data)
                            .then(async (res: any) => {
                                if (res.error) {
                                    toast.error(res.error);
                                } else {
                                    modal?.hide();
                                    toast.success(`Successfully deleted!`);
                                }
                            })
                            .catch((err: Error) => toast.error(err.message))
                    }}
                    method="POST"
                >
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="flex left-0  mb-2 text-3xl font-bold text-gray-700" form='Affilname'>
                                ชื่อสังกัด
                            </label>
                            <textarea
                                className="w-[480px] h-[150px] text-sm pl-2 pt-2 rounded-lg leading-tight bg-white text-gray-700 border  shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="Affilname"
                                name='Affilname'
                                placeholder="ชื่อสังกัด / ที่ตั้ง (ตำบล,อำเภอ,จังหวัด)"
                                required
                            />
                        </div>
                    </div>
                    <FormButton>
                        <div className=' ml-52 flex items-center justify-center p-3 text-center border-2 rounded-lg hover:bg-blue-500 hover:text-white'>
                        บันทึก
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" flex ml-2 mt-1 bi bi-floppy" viewBox="0 0 16 16">
                                <path d="M11 2H9v3h2z" />
                                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                        </div>
                    </FormButton>
                </form>
            </div>
        </>
    )
}
