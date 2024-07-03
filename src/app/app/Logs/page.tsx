import React, { Suspense } from 'react'
import { PrismaClient } from '@prisma/client'
import LogsTable from '@/components/table/LogsTable';
import { getRequestsalarycertificate, getcontect, getsalarycertificate } from '@/utils/action';
import { notFound, redirect } from "next/navigation";
import { getSession } from '@/utils/auth';
import Loading from '../Loading';

type props = {
  searchParams?: {
    page?: string;
  };
};

const prisma = new PrismaClient();
export default async function page({ searchParams }: props) {
  const session = await getSession();
  // console.log(session)

  if (!session?.user) {
    notFound();
  }
  if (session.user.role == "USER") {
    notFound();
  }


  const currentPage = parseInt(searchParams?.page!, 10) || 1;
  const pageSize = 10;

  const [Requestsalarycertificate] = await Promise.all([getRequestsalarycertificate(currentPage)]);
  const [salarycertificate] = await Promise.all([getsalarycertificate(currentPage)]);
  const [contect] = await Promise.all([getcontect(currentPage)]);
  // console.log(salarycertificate.length)
  return (
    <div>
      <h1 className=' text-3xl font-semibold text-black'>บันทึก</h1>
      <Suspense fallback={<Loading/>}>
      <LogsTable contect={contect} currentPage={currentPage} Requestsalarycertificate={Requestsalarycertificate} salarycertificate={salarycertificate} />
      </Suspense>
    </div>
  )
}