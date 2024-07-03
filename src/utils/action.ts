"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { Sex } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";


export async function edit(formData: FormData) {
  const id = formData.get("id") as string;
  const fname = formData.get("fname") as string;
  const lname = formData.get("lname") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const u_num = formData.get("u_num") as string;
  const birthday = formData.get("birthday") as string;
  const sex = formData.get("sex") as Sex;
  const Affil = formData.get("Affil") as any;
  const Groups = formData.get("Groups") as any;
  const Avatar = formData.get("Avatar") as any;
  const file = formData.get("file") as any;
  // console.log(file)

  try {
    await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        fname,
        lname,
        phone,
        birthday,
        u_num,
        sex,
        username,
        password,
        Avatar,
      }
    });
    revalidateTag(`users`);
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
  //   // const hashedPassword = await hash(password, 5);
  // // try{
  // //   const edituser = await prisma.user.update({
  // //     where: {
  // //       id: Number(inputId),
  // //     },
  // //     data: {
  // //       fname,
  // //       lname,
  // //       phone,
  // //       birthday,
  // //       u_num,
  // //       sex,
  // //       username,
  // //       password,
  // //       Avatar,
  // //     },
  // //   })
  // //   // console.log(edituser)
  // //   revalidatePath("/app/profile")

  // // }  
};

export const createUser = async (formData: FormData) => {
  const usernameInput = formData.get("username") as string;
  const passwordInput = formData.get("password") as string;
  const email = formData.get("email") as string;
  const fname = formData.get("fname") as string;
  const lname = formData.get('lname') as string;
  const u_num = formData.get('u_num') as string;
  const phone = formData.get('phone') as string;
  const birthday = formData.get('birthday') as string;
  const AffilId = formData.get('AffilId') as string;
  const Group = formData.get('GroupId') as string;
  const sex = formData.get("sex") as Sex;
  const Position = formData.get("Position") as string

  const affilValue = JSON.parse(AffilId);
  const GroupValue = JSON.parse(Group);
  const PositionValue = JSON.parse(Position);

  const idAffil = Number(affilValue.id);
  const idGroup = Number(GroupValue.id);
  const idPosition = Number(PositionValue.id);

  const { username, password } = { username: usernameInput, password: passwordInput };
   
  // console.log(PositionValue)
  try {
    const response = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          fname,
          lname,
          username,
          password,
          birthday,
          u_num,
          phone,
          sex,
          AffilId: idAffil,
          GroupsId: idGroup,
          PositionId:idPosition,
        },
      });
      const idUser = Number(user.id);
      const Salarys = await prisma.salary.create({
        data: {
          userId: idUser,
        },
      });
      const RequesUser = await prisma.requestUser.create({
        data: {
          userId: idUser,
        },
      });
      const requesUserWorkcertificate = await prisma.requesUserWorkcertificate.create({
        data: {
          userId: idUser,
        },
      });
      const idSalary = Number(Salarys.id);
      const Expenses = await prisma.expenses.create({
        data: {
          salaryId: idSalary,
        },
      });
      const Revenue = await prisma.revenue.create({
        data: {
          salaryId: idSalary,
        },
      });
      const newposition = await prisma.newpositionUser.create({
        data: {
          userId: idUser,
          newposition:PositionValue.Posnames,
          newlevel:PositionValue.levels,
          newsalary:PositionValue.salarys,
          dateUpdate:PositionValue.dateUpdate,
        }
      });
      const origipos = await prisma.originalpos.create({
        data:{
          NewpositionUserId:Number(newposition.id),
          origipos:PositionValue.Posnames,
          oldlevel:PositionValue.levels,
          oldsalary:PositionValue.salarys,
          dateUpdate:PositionValue.dateUpdate,
        }
      });
      const logs = await prisma.logs.create({
        data: {
          userId: idUser
        }
      });
      return { user, Salarys, Expenses, Revenue, newposition ,origipos, logs ,RequesUser , requesUserWorkcertificate};
    });
    revalidatePath("/app/tableuser")
    // console.log(data)
    return response;
  } catch (error: any) {

    return {
      error: error.message
    }
  }
};

export async function deleteUser(formData: FormData) {

  const userid = formData.get("id") as string;
  const Users = JSON.parse(userid)

  const idUser = Users.id;
  const idSalary = Users.salary.id;
  const idnewposition = Users.idoriginalposition.id;
  // console.log(idnewposition)
  try {
    await prisma.$transaction(async (prisma) => {
      // await prisma.originalpos.delete({
      //   where:{
      //     NewpositionUserId:Number(idnewposition),
      //   }
      // });
      await prisma.expenses.delete({
        where: {
          salaryId: Number(idSalary),
        },
      });
      await prisma.revenue.delete({
        where: {
          salaryId: Number(idSalary),
        },
      });
      await prisma.salary.delete({
        where: {
          userId: Number(idUser),
        },
      });
      const logs = await prisma.logs.findUnique({
        where: {
          userId: Number(idUser)
        }
      })
      if (logs) {
        await prisma.logs.delete({
          where: {
            userId: Number(idUser),
          },
        });
      }
      await prisma.newpositionUser.delete({
        where: {
          userId: Number(idUser),
        },
      });
      await prisma.user.delete({
        where: {
          id: Number(idUser),
        },
      });

    });
    revalidatePath("/app/tableuser");
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export const createAffil = async (data: FormData) => {
  const Affilname = data.get('Affilname') as string;
  try {
    const response = await prisma.affil.create({
      data: {
        Affilname,

      },
    })
    // console.log(data)
    revalidatePath("/app/tableAffil-Group")
    return response;
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}

export const createGroup = async (data: FormData) => {
  const Groupname = data.get('Groupname') as string;
  const AffilId = data.get('AffilId') as string;

  const idAffil = Number(AffilId);
  // console.log(Groupname)
  try {
    const response = await prisma.group.create({
      data: {
        Groupname,
        AffilId: idAffil,

      },
    })
    // console.log(response)
    revalidatePath("/app/tableAffil-Group#")
    return response;
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}

export async function getUsers(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  return await unstable_cache(
    async () => {
      return prisma.user.findMany({
        include: {
          RequesUserWorkcertificate:{
          include:{
            user:true,
          }
          },
          RequestUser:{
            include:{
              user:true,
            }
          },
          Affil: {
            include: {
              Group: true
            }
          },
          Groups: {
            include: { Position: true }
          },
          Position: true,
          NewpositionUser: {
            include: {
              originalpos: true
            }
          },
          salary: {
            include: {
              Expenses: true,
              Revenues: true,
            }
          }
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        skip: offset,
        take: pageSize,
      });
    },
    [`users-${page}-${pageSize}`],
    {
      revalidate: 1,
      tags: [`users`],
    },
  )();
}
export async function getAffill(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  return await unstable_cache(
    async () => {
      return prisma.affil.findMany({
        include: {
          Group: {
            include: {
              User: true,
              Position: {
                include: { User: true, }
              },
            }
          },
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        skip: offset,
        take: pageSize,
      });
    },
    [`/app/tableAffil-Group-${page}-${pageSize}`],
    {
      revalidate: 1,
      tags: [`/app/tableAffil-Group`],
    },
  )();
}
export async function getRequestsalarycertificate(page = 1, pageSize = 50) {
  const offset = (page - 1) * pageSize;

  return await unstable_cache(
    async () => {
      return prisma.requestsalarycertificate.findMany({
        include: {
          Logs: {
            include: {
              user: true,
            }
          }
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        skip: offset,
        take: pageSize,
      });
    },
    [`users-${page}-${pageSize}`],
    {
      revalidate: 1,
      tags: [`users`],
    },
  )();
}
export async function getsalarycertificate(page = 1, pageSize = 50) {
  const offset = (page - 1) * pageSize;

  return await unstable_cache(
    async () => {
      return prisma.salaryCertificate.findMany({
        include: {
          Logs: {
            include: {
              user: true,
            }
          }
        },
        orderBy: [
          {
            id: "desc",
          },
        ],
        skip: offset,
        take: pageSize,
      });
    },
    [`users-${page}-${pageSize}`],
    {
      revalidate: 1,
      tags: [`users`],
    },
  )();
}
export async function getcontect(page = 1, pageSize = 50) {
  const offset = (page - 1) * pageSize;

  return await unstable_cache(
    async () => {
      return prisma.contact.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        skip: offset,
        take: pageSize,
      });
    },
    [`users-${page}-${pageSize}`],
    {
      revalidate: 1,
      tags: [`users`],
    },
  )();
}
export async function editUser(formData: FormData) {
  const id = formData.get("id") as string;
  const fname = formData.get("fname") as string;
  const lname = formData.get("lname") as string;
  const phone = formData.get("phone") as string;
  const u_num = formData.get("u_num") as string;
  const Affil = formData.get("Affil") as string;
  const Groups = formData.get("Groups") as string;
  const Position = formData.get("Position") as string;

  const userSalary = JSON.parse(id);
  const PosiSalary = JSON.parse(Position)
  const affilValue = JSON.parse(Affil);
  const groupValue = JSON.parse(Groups);

  const Posname = PosiSalary.Posnames;
  const PosLevel = PosiSalary.levels;
  const salarys = PosiSalary.salarys;
  const Positionid = PosiSalary.id;
  const dates = userSalary.date;

  const idAffil = Number(affilValue.id);
  const idGroup = Number(groupValue.id);
  const PosSalary = Number(PosiSalary.salarys);
  const iduser = Number(userSalary.iduser);
  const idSalary = Number(userSalary.salaryid);
  const idnewposition = Number(userSalary.idnewposition);
  // console.log(idSalary)
  try {
    await prisma.user.update({
      where: {
        id: Number(iduser),
      },
      data: {
        fname,
        lname,
        phone,
        u_num,
        AffilId: idAffil,
        GroupsId: idGroup,
        PositionId: Number(Positionid),
      },
    });
    const newPos = await prisma.newpositionUser.update({
      where: {
        userId: Number(iduser)
      },
      data: {
        newposition: Posname,
        newlevel: PosLevel,
        newsalary: salarys,
        dateUpdate: dates,
      }
    })
    await prisma.revenue.update({
      where: {
        salaryId: idSalary,
      },
      data: {
        salarys: PosSalary,
      },
    });
    await prisma.originalpos.create({
      data: {
        NewpositionUserId: Number(idnewposition),
        oldlevel: PosLevel,
        oldsalary: PosSalary,
        origipos: Posname,
        dateUpdate: dates,
      }
    });
    revalidateTag(
      `users`,
    );
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function editLevel(Levels: any) {
  const id = Levels.id;
  const level = Levels.level;

  // const levels = JSON.parse(level)
  // console.log(Levels)
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        level,
      },
    });

    revalidateTag(
      `users`,
    );
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function editStatus(sta: any) {
  const id = sta.id;
  const status = sta.status;

  // const levels = JSON.parse(level)
  // console.log(sta)
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    revalidateTag(
      `users`,
    );
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function editExpenses(formData: FormData) {
  const id = formData.get("id") as string;
  const AFCM = formData.get("AFCM") as string;
  const CPS = formData.get("CPS") as string;
  const GHBank = formData.get("GHBank") as string;
  const GPF = formData.get("GPF") as string;
  const IslamicBank = formData.get("IslamicBank") as string;
  const Krungthai = formData.get("Krungthai") as string;
  const Nakho = formData.get("Nakho") as string;
  const PAOC = formData.get("PAOC") as string;
  const PAOF = formData.get("PAOF") as string;
  const PHSC = formData.get("PHSC") as string;
  const Salarydropped = formData.get("Salarydropped") as string;
  const SavingsBank = formData.get("SavingsBank") as string;
  const Student = formData.get("Student") as string;
  const TSC = formData.get("TSC") as string;
  const TeachersCoop = formData.get("TeachersCoop") as string;
  const Welfarefund = formData.get("Welfarefund") as string;
  const WiratCoop = formData.get("WiratCoop") as string;
  const incometax = formData.get("incometax") as string;
  const socialsecurity = formData.get("socialsecurity") as string;
  // console.log(AFCM)

  const AFCMs = Number(AFCM);
  const CPSs = Number(CPS);
  const GHBanks = Number(GHBank);
  const GPFs = Number(GPF);
  const IslamicBanks = Number(IslamicBank);
  const Krungthais = Number(Krungthai);
  const Nakhos = Number(Nakho);
  const PAOCs = Number(PAOC);
  const PAOFs = Number(PAOF);
  const PHSCs = Number(PHSC);
  const Salarydroppeds = Number(Salarydropped);
  const SavingsBanks = Number(SavingsBank);
  const Students = Number(Student);
  const TeachersCoops = Number(TeachersCoop);
  const Welfarefunds = Number(Welfarefund);
  const WiratCoops = Number(WiratCoop);
  const incometaxs = Number(incometax);
  const socialsecuritys = Number(socialsecurity);
  try {
    await prisma.expenses.update({
      where: {
        id: Number(id),
      },
      data: {
        AFCM: AFCMs,
        CPS: CPSs,
        GHBank: GHBanks,
        GPF: GPFs,
        IslamicBank: IslamicBanks,
        Krungthai: Krungthais,
        Nakho: Nakhos,
        PAOC: PAOCs,
        PAOF: PAOFs,
        PHSC: PHSCs,
        Salarydropped: Salarydroppeds,
        SavingsBank: SavingsBanks,
        Student: Students,
        TeachersCoop: TeachersCoops,
        Welfarefund: Welfarefunds,
        WiratCoop: WiratCoops,
        incometax: incometaxs,
        socialsecurity: socialsecuritys,
      },
    });
    revalidatePath("/app/tableuser");
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
export async function editRevenues(formData: FormData) {
  const id = formData.get("id") as string;
  const BrokenGPF = formData.get("BrokenGPF") as string;
  const Childtuition = formData.get("Childtuition") as string;
  const Compensation = formData.get("Compensation") as string;
  const Houserent = formData.get("Houserent") as string;
  const Medicalexpenses = formData.get("Medicalexpenses") as string;
  const Posallowan = formData.get("Posallowan") as string;
  const costofliving = formData.get("costofliving") as string;
  const fullsalary = formData.get("fullsalary") as string;
  const obtainback = formData.get("obtainback") as string;
  const salarys = formData.get("salarys") as string;
  const tax = formData.get("tax") as string;

  const BrokenGPFs = Number(BrokenGPF);
  const Childtuitions = Number(Childtuition);
  const Compensations = Number(Compensation);
  const Houserents = Number(Houserent);
  const Medicalexpensess = Number(Medicalexpenses);
  const Posallowans = Number(Posallowan);
  const costoflivings = Number(costofliving);
  const fullsalarys = Number(fullsalary);
  const obtainbacks = Number(obtainback);
  const salaryss = Number(salarys);
  const taxs = Number(tax);

  try {
    await prisma.revenue.update({
      where: {
        id: Number(id),
      },
      data: {
        BrokenGPF: BrokenGPFs,
        Childtuition: Childtuitions,
        Compensation: Compensations,
        Houserent: Houserents,
        Medicalexpenses: Medicalexpensess,
        Posallowan: Posallowans,
        costofliving: costoflivings,
        fullsalary: fullsalarys,
        obtainback: obtainbacks,
        salarys: salaryss,
        tax: taxs,
      },
    });

    revalidatePath("/app/tableuser");
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
export const RequesSalary = async (users: any) => {
 const user = await JSON.parse(users)
  const coment = user.coment;
  const date = user.date;
  const idLog = user.Logsid;
  const nameUser = user.nameUser;
  // console.log(user)

  try {
    await prisma.requestsalarycertificate.create({
      data: {
        Logsid: Number(idLog),
        nameUser:nameUser,
        coment: coment,
        date: date,
      },
    })
    revalidatePath("/app/Logs");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const RequesUserSalary = async (Reques: any) => {
  const RequesUser = await JSON.parse(Reques)
  const userId = RequesUser.userId;
  const text = RequesUser.text;
  const Status = RequesUser.Status;
  const data = RequesUser.data;

  // console.log(data)
  try {
    const RequesUser = await prisma.requestUser.findUnique({
      where:{
        userId:Number(userId)
      }
    })
    if(RequesUser){
      await prisma.requestUser.update({
       where:{
        userId:Number(userId)
       },
       data:{
        text,
        Status,
        dateTime:data,
       }
      })
    }
    revalidatePath("/app/tableuser");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const RequesUserWorkcertificates = async (Reques: any) => {
  const RequesUser = await JSON.parse(Reques)
  const userId = RequesUser.userId;
  const text = RequesUser.text;
  const Status = RequesUser.Status;
  const data = RequesUser.data;

  // console.log(RequesUser)
  try {
    const RequesUser = await prisma.requesUserWorkcertificate.findUnique({
      where:{
        userId:Number(userId)
      }
    })
    if(RequesUser){
      await prisma.requesUserWorkcertificate.update({
        where:{
         userId:Number(userId)
        },
        data:{
         text,
         Status,
         dateTime:data,
        }
       })
    }
    revalidatePath("/app/tableuser");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const RefreshRequesUser = async (Reques: any) => {
  const RequesUser = await JSON.parse(Reques)
  const userId = RequesUser.userId;
  const Status = RequesUser.Status;
  const data = RequesUser.data;
  const Hrname = RequesUser.Hrname;

  // console.log(RequesUser)
  try {
    const RequesUser = await prisma.requestUser.findUnique({
      where:{
        userId:Number(userId)
      }
    })
    if(RequesUser){
      await prisma.requestUser.update({
       where:{
        userId:Number(userId)
       },
       data:{
        Hrname,
        Status,
        dateTime:data,
       }
      })
    }
    revalidatePath('/app/salary');
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const RefreshRequesUserWorkcertificate = async (Reques: any) => {
  const RefreshRequesUser = await JSON.parse(Reques)
  const userId = RefreshRequesUser.userId;
  const Status = RefreshRequesUser.Status;
  const data = RefreshRequesUser.data;
  const Hrname = RefreshRequesUser.Hrname;

  // console.log(RefreshRequesUser)
  try {
    const RefreshRequesUserWorkcertificate = await prisma.requesUserWorkcertificate.findUnique({
      where:{
        userId:Number(userId)
      }
    })
    if(RefreshRequesUserWorkcertificate){
      await prisma.requesUserWorkcertificate.update({
       where:{
        userId:Number(userId)
       },
       data:{
        Hrname,
        Status,
        dateTime:data,
       }
      })
    }
    revalidatePath("/app/salary");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const ResponseHr = async (user: any) => {
  const RequesUser = await JSON.parse(user)
  const id = RequesUser.id;
  const Hrname = RequesUser.Hrname;
  const Status = RequesUser.Status;

  // console.log(id)
  try {
    const RequesUser = await prisma.requestUser.findUnique({
      where:{
        id:Number(id)
      }
    })
    if(RequesUser){
      await prisma.requestUser.update({
       where:{
        id:Number(id)
       },
       data:{
        Hrname,
        Status,
       }
      })
    }
    revalidatePath("/app/tableuser");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
export const ResponseHrs = async (user: any) => {
  const requesUserWorkcertificate = await JSON.parse(user)
  const id = requesUserWorkcertificate.id;
  const Hrname = requesUserWorkcertificate.Hrname;
  const Status = requesUserWorkcertificate.Status;

  // console.log(Hrname)
  try {
    const requesUserWorkcertificate = await prisma.requesUserWorkcertificate.findUnique({
      where:{
        id:Number(id)
      }
    })
    if(requesUserWorkcertificate){
      await prisma.requesUserWorkcertificate.update({
       where:{
        id:Number(id)
       },
       data:{
        Hrname,
        Status,
       }
      })
    }
    revalidatePath("/app/tableuser");
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}

export const SalarySlipContent = async (users: any) => {
  const idLog = users.logs.id;
  const date = users.date;
  const content = users.content;
  // console.log(users)
  try {
    await prisma.salaryCertificate.create({
      data: {
        Logsid: Number(idLog),
        Content: content,
        date: date,
      },
    })
    revalidatePath("/app/Logs")
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
export async function deleteAffil(formData: FormData) {
  const id = formData.get("id") as string;
  const idaffil = JSON.parse(id);
  try {
    await prisma.$transaction(async (prisma) => {

      await prisma.affil.delete({
        where: {
          id: Number(idaffil),
        },

      });
    });
    revalidatePath("/app/tableAffil-Group");
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
export const createPosition = async (data: FormData) => {
  // console.log(data)
  const GroupId = data.get('Groupid') as string;
  const Posnames = data.get('Posnames') as string;
  const levels = data.get('levels') as string;
  const Codes = data.get('Codes') as string;
  const salarys = data.get('salarys') as string;

  try {
    const response = await prisma.position.create({
      data: {
        GroupId: Number(GroupId),
        Posnames,
        levels,
        salarys: Number(salarys),
        Codes: Number(Codes),
      },
    })
    // console.log(response)
    revalidatePath("/app/tableAffil-Group#")
    return response;
  } catch (error: any) {

    return {
      error: error.message
    }
  }
}
//การตอบกลับจากผู้ที่่สนใจ
export const RequestPeple = async (formData: any) => {
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const firstnumber = formData.get("firstnumber") as string;
  const text = formData.get("text") as string;
  // console.log(formData)
  try {
    const contect = await prisma.contact.create({
      data: {
        email,
        firstnumber,
        phone,
        text
      }
    })
    // console.log(contect)
    revalidatePath("/app/Logs")
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}