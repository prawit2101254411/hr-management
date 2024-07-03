"use client"
import { deleteUser } from "@/utils/action"
import { FormButton } from "../FormButton"
import { toast } from "sonner"
import { useModal } from "@/components/modal/provider"

interface props {
  user: any
}

export default function DeleteUserModal({ user }: props) {
  const modal = useModal();
  return (
    <div className=" group hover:mt-1 text-black">
      <button
        type="button"
        onClick={() => modal?.show(<FormDelete user={user} />)}
        className=""
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
      <div className=" fixed hidden group-hover:block group-focus:block bg-gray-700 bg-opacity-60 text-white py-1 px-2 rounded mt-2">
        ลบผู้ใช้
      </div>
    </div>
  );
}

const FormDelete = ({ user }: props) => {
  // console.log(user)
  const modal = useModal();
  return (
    <>
      <div className="mx-auto w-full border max-w-[550px] bg-white shadow-md rounded-xl">
        <form className="py-6 px-9"
          method="POST"
          action={async (data: FormData) => {
            deleteUser(data)
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
          <input name="id" hidden value={JSON.stringify({ id: user.id, salary: user.salary, idoriginalposition: user.NewpositionUser })} />
          <div className=" flex items-center justify-center">
            <label htmlFor="email" className="mb-3 text-center px-2 py-5 block text-base font-medium text-red-700">
             <a className=" text-3xl font-semibold">ลบผู้ใช้</a> 
             <a className=" flex mt-3">
             ชื่อผู้ใช้ : {user.fname} {user.lname}
             </a>
             <a className=" flex mt-3">
             email: {user.username}
             </a>
            </label>
          </div>
          <div className=" flex items-center justify-center">
          <FormButton>
            <div className=" flex border-2 p-3 rounded-md hover:bg-red-500 hover:text-white">ลบผู้ใช้
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" ml-2 bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
          </FormButton>

          </div>
        </form>
      </div>
    </>
  )
}
