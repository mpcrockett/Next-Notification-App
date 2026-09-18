'use client';
import NotificationForm from "./components/notificationForm";
import { useSession, signIn, signOut } from "next-auth/react";
import useUser from '@/utils/hooks/useUser';
import OnboardingPage from "./components/onboardingForm";

export default function Home() {
  const { status, data: session } = useSession();
  const { user, refetch } = useUser();

  return (
    <>
      {status === 'loading' && <h3>Loading...</h3>}

      {status === 'unauthenticated' && (
        <h3>
          Login with{" "}
          <button onClick={() => signIn("google")}>Google</button>
        </h3>
      )}

      {status === 'authenticated' && !user?.onboarded && (
        <>
          <h3>Welcome, {session?.user?.name}</h3>
          <OnboardingPage onComplete={refetch} userId={user?.id} />
        </>
      )}

      {status === 'authenticated' && user?.onboarded && (
        <>
         <button onClick={() => signOut()}>Sign Out</button>
        <NotificationForm />
        </>
      )}

    </>
  );
}