import React from 'react'
import EditForm from '@/components/EditForm';
import { getUserById } from '@/server/get-user';
import { getSession } from '@/utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Editpage() {
const session = await getSession();

const [user] = await Promise.all([getUserById(Number(session?.user.id))]);


// console.log(user)
return (
        <div>
           <EditForm section={session} user={user}  />
           </div>

    );
};
