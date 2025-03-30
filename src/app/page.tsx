'use client';
import NotificationForm from "./components/notificationForm";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();


  return (
    <>
      {status === 'loading' && <h3>Loading...</h3>}
      {status === 'authenticated' ? 
        ( <>
            <h3>Welcome, {session.user.name}</h3>
            <h3><a href="/api/auth/signout">Sign Out</a></h3>
          </>
        )
        : <h3>Login with <a href="/api/auth/signin">Google</a></h3>}
      <NotificationForm />
    </>

  );
}