import Profile from "@/components/Profile";
import { getUserById } from "@/server/get-user";
import { getSession } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";
import NotFound from "./not-found";
import { Suspense } from "react";
import Loading from "../Loading";

export default async function() {

  const session = await getSession();

    // console.log(session)
 
  if (!session?.user) {
    redirect("/login");
  }

  const [user] = await Promise.all([getUserById(Number(session.user.id))]);

  if (!user) {
    NotFound();
  }
  return (
      <div className="left-0 w-full">
        <Suspense fallback={<Loading/>}>
      < Profile session={session} user={user}/>
      </Suspense>
      </div>
  )
}