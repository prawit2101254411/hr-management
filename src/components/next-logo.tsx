'use client';
export default function NextLogo({ session, user }: {
  session: any,
  user: any,
}) {
  return (
    <div className=" text-center items-center">
      <h1>{session.user.email}</h1>

    </div>

  );
}
