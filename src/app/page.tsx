'use client';
import Link from "next/link";
import NotificationForm from "./components/notificationForm";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();


  return (
    <>
      {status === 'loading' && <h3>Loading...</h3>}
      {status === 'authenticated' ? 
        ( <>
            <h3>Welcome, {session?.user?.name}</h3>
            <h3><Link href="/api/auth/signout">Sign Out</Link></h3>
          </>
        )
        : (<h3>Login with <Link href="/api/auth/signin">Google</Link></h3>)}
      <NotificationForm />
    </>
  );
}