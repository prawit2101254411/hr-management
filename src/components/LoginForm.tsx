"use client"
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FormButton } from "./FormButton";

export default function LoginForm() {

    const [errorMessage, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        console.log(username,password)

        const { error, status, ok, url }: any = await signIn('credentials', {
            username: username,
            password: password,
            redirect: false,
            callbackUrl: '/app/profile',
        });
        if (error) {
            setError("Username or Password is incorrect")
            console.error(error)
        }
        if (status == 200 && ok) {
            redirect(url)
        }
    }
    return (
        <form action={handleSubmit} className=" mt-5 px-14 py-5 text-center">
            <div className=" h-full">
                <div className="group relative ">
                    <label htmlFor="password" className=" flex left-0 ml-0">อีเมล</label>
                    <input className="peer h-12 w-full rounded-xl border-2  px-4 text-sm outline-none"
                        type="text"
                        id="username"
                        name="username"
                        placeholder=""
                        required
                    />
                </div>
                <div className="group mt-4 relative">
                    <label htmlFor="password" className=" flex left-0 ml-0">รหัสผ่าน</label>
                    <input className="peer h-12 w-full rounded-xl border-2 px-4 text-sm outline-none"
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <div className=" py-5 mt-4 rounded-lg">
                    <FormButton>
                        <a className=" border-2 py-3 rounded-lg px-9 hover:bg-blue-500 hover:text-white hover:shadow-lg ">
                            เข้าสู่ระบบ
                        </a>
                    </FormButton>
                </div>
                <div>
                    {!!errorMessage && <p className="py-5 text-red-500">{errorMessage}</p>}
                </div>
            </div>
        </form>
    );
}