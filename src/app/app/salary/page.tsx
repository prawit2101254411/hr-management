import React, { Suspense } from 'react'
import SalaryTableUser from '@/components/tablesalary/SalaryTableUser'
import { getUserById } from '@/server/get-user';
import { getSession } from '@/utils/auth';
import NotFound from '../profile/not-found';
import { notFound } from 'next/navigation';
import Loading from '../Loading';

export default async function Tablesalary() {
    const session = await getSession();
    if (!session?.user || session.user.role !== "USER") {
        notFound();
    }
    // const number = 1234;
    // const words = converter.toWords(number);
    // console.log(words);

    const [user] = await Promise.all([getUserById(Number(session?.user.id))]);

    // console.log(user)

    return (
        <div>
            <Suspense fallback={<Loading/>}>
            <SalaryTableUser salary={user.salary} user={user} Request={user.RequestUser} RequesUserWorkcertificate={user.RequesUserWorkcertificate} />
            </Suspense>
        </div>

    )
}



