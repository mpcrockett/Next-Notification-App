'use client';
import NotificationForm from "./components/notificationForm";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();

  return (
    <>
      {status === 'loading' && <h3>Loading...</h3>}
      {status === 'authenticated' ? 
        ( <>
            <h3>Welcome, {session?.user?.name}</h3>
            {/* FIX: Use an interactive element with signOut() */}
            <h3>
              <button 
                onClick={() => signOut()} 
                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
              >
                Sign Out
              </button>
            </h3>
          </>
        )
        : (
          /* FIX: Use an interactive element with signIn() */
          <h3>
            Login with{" "}
            <button 
              onClick={() => signIn("google")}
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
            >
              Google
            </button>
          </h3>
        )}
      <NotificationForm />
    </>
  );
}