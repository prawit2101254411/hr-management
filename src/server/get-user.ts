import { cache } from "react";
import "server-only"
import { prisma } from "@/utils/prisma";

export const revalidate = 1_800

export const getUserById = cache(async(id:number) => {
    return await prisma.user.findUnique({
        where: {
            id:id,
        },
        include:{
            RequestUser:true,
            RequesUserWorkcertificate:true,
            NewpositionUser:true,
            Position:true,
            Affil:true,
            Groups:true,
            Logs:{
                include:{
                    Requestsalarycertificate:true,
                }
            },
            salary:{
                include:{
                    Expenses:true,
                    Revenues:true,
                }
            }
        }
    }).catch((err) => {
        return err
    })
})
