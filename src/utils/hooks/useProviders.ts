import { useState, useEffect } from 'react';
import { iUser } from '../Types';
import { useSession } from 'next-auth/react';

export default function useProviders() {
  const [providers, setProviders] = useState<iUser[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch('/api/providers')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        if(data) return setProviders(data.providers);
        return
      })
      .catch((error) => {
        console.error("Error fetching therapists", error);
      });
  }, [status]);

  return providers;
};

