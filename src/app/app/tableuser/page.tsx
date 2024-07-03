import React, { Suspense } from 'react'
import TableUser from '../../../components/table/tableusers'
import { getUsers } from '@/utils/action';
import { PrismaClient } from '@prisma/client';
import CreateUserModal from '@/components/table/user-create';
import { getSession } from '@/utils/auth';
import { notFound, redirect } from "next/navigation";
import NotFound from '../profile/not-found';
import { getUserById } from '@/server/get-user';
import Loading from '../Loading';

const prisma = new PrismaClient();

type props = {
    searchParams?: {
        page?: string;
    };
};

export default async function Tableusers({ searchParams }: props) {

    const session = await getSession();
    if (!session?.user){
        notFound();
    }
    if (session.user.role == "USER") {
        notFound();
      }
    
    const currentPage = parseInt(searchParams?.page!, 10) || 1;
    const pageSize = 10;
    // console.log(currentPage)
    const [data] = await Promise.all([getUsers(currentPage, pageSize)]);
    const affil = await prisma.affil.findMany({
        include: {
            Group: {
                include: {
                    User: true,
                    Position: true,
                }
            },
        }
    })
    const [HrName] = await Promise.all([getUserById(Number(session?.user.id))])
    // console.log(user)
    return (
        <div >
            <h1 className=" text-left text-3xl text-black font-extrabold ">ตารางผู้ใช้</h1>
            <CreateUserModal affil={affil} data={data} /><br />
            {/* <Suspense fallback={<Loading/>}> */}
            <TableUser currentPage={currentPage} data={data} affil={affil} HrName={HrName} />
            {/* </Suspense> */}
        </div>
    )
}
