'use client';
import NotificationForm from "./components/notificationForm";
import { useSession, signIn, signOut } from "next-auth/react";
import useUser from '@/utils/hooks/useUser';
import OnboardingPage from "./components/onboardingForm";
import { Button, Box } from '@chakra-ui/react';
import { Navbar } from "./components/navBar";

export default function Home() {
  const { status, data: session } = useSession();
  const { user, refetch } = useUser();

  return (
    <>
      {status === 'loading' && <h3>Loading...</h3>}

      {status === 'unauthenticated' && (
        <Box maxW="400px" mx="auto" mt="50px" textAlign="center">
          Login with{" "}
          <Button onClick={() => signIn("google")}>Google</Button>
        </Box>
      )}

      {status === 'authenticated' &&
      <Box>
        <Navbar name={session?.user?.name ?? ''} image={session?.user?.image ?? ''} signOut={signOut}/>
        {!user?.onboarded && <OnboardingPage onComplete={refetch} userId={user?.id} /> }
        { user?.onboarded && <NotificationForm /> }
      </Box>
      }
      


    </>
  );
}