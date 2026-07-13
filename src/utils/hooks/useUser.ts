import { useState, useEffect } from 'react';
import { iUser } from '../Types';
import { useSession } from 'next-auth/react';

export default function useUser() {
  const [user, setUser] = useState<iUser | null>(null);
  const { status, data } = useSession();

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
  }, [status, data]);

  return user;
};