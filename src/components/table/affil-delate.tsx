"use client"
import { deleteUser } from "@/utils/action"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { useModal } from "@/components/modal/provider"
import { deleteAffil } from "@/utils/action"

interface props {
  id: number;
  affilname: string;
}

export default function DeleteAffilModal({ id, affilname }: props) {
  // console.log(id,affilname)
  const modal = useModal();
  return (
    <button
      type="button"
      onClick={() => modal?.show(<FormDelete id={id} affilname={affilname} />)}
    >
      <a x-data="{ tooltip: 'Delete' }" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          x-tooltip="tooltip"
        >
          <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </a>

    </button>
  );
}

const FormDelete = ({ id, affilname }: props) => {
  const modal = useModal();
  return (
    <>
      <div className="mx-auto w-full max-w-[550px] bg-white border-2 rounded-xl">
        <form className="py-6 px-9"
          method="POST"
          action={async (data: FormData) => {
            deleteAffil(data)
              .then(async (res) => {
                if (res?.error) {
                  toast.error(res?.error);
                } else {
                  modal?.hide();
                  toast.success("ลบสำเร็จ!");
                }
              })
              .catch((err: Error) => toast.error(err.message))
          }}
        >
          <input name="id" value={id} hidden />
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 text-center px-2 py-5 block text-base font-medium text-[#07074D]">
              Delete email: {affilname}
            </label>
          </div>
          <div className=" flex items-center justify-center p-3 rounded-xl hover:text-red-800 bg-gray-100 hover:bg-gray-300 text-center">
            <FormButton>ลบ</FormButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="ml-2 bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </div>
        </form>
      </div>
    </>
  )
}
