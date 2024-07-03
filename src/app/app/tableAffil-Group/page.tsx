import React, { Suspense } from 'react'
import TableAffilGroup from '@/components/table/TableAffil-Group'
import { PrismaClient } from '@prisma/client'
import CreateAffilModal from '@/components/table/affil-create'
import { getAffill } from '@/utils/action';
import { notFound, redirect } from "next/navigation";
import { getSession } from '@/utils/auth';
import Loading from '../Loading';

const prisma = new PrismaClient();

type props = {
  searchParams?: {
    page?: string;
  };
};


export default async function page({ searchParams }: props) {
  const session = await getSession();

  if (!session?.user){
    notFound();
  }
  if (session.user.role == "USER") {
    notFound();
  }

  const currentPage = parseInt(searchParams?.page!, 10) || 1;
  const pageSize = 10;

  const [DataAffil] = await Promise.all([getAffill(currentPage, pageSize)]);
  const affil = await prisma.affil.findMany({
    include: {
      Group: {
        include: {
          User: true,
          Position: {
            include: { User: true, }
          },
        }
      },
    }
  });

  return (
    <div>
      {/* <CreateGroupModal/><br/> */}
      <h3 className=" text-left text-3xl text-gray-900 font-extrabold">ตารางสังกัด</h3>
      <CreateAffilModal />
      <Suspense fallback={<Loading/>}>
      <TableAffilGroup affil={affil} DataAffil={DataAffil} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
