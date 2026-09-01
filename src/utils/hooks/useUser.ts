import { useState, useEffect, useCallback } from 'react';
import { iUser } from '../Types';
import { useSession } from 'next-auth/react';

export default function useUser() {
  const [user, setUser] = useState<iUser | null>(null);
  const [refetchIndex, setRefetchIndex ] = useState(0);
  const { status, data } = useSession();

  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1 );
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/user/${data.user?.email}`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        if(data) return setUser(data.user);
        return
      })
      .catch((error) => {
        console.error("Error fetching user", error);
      });
  }, [status, data, refetchIndex]);

  return { user, refetch };
};