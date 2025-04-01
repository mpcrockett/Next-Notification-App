import { useState, useEffect } from 'react';
import { iUser } from '../Types';

export default function useProviders() {
  const [providers, setProviders] = useState<iUser[]>([]);

  useEffect(() => {
    fetch('/api/providers')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        if(data) return setProviders(data.providers);
        return setProviders([]);
      })
      .catch((error) => {
        console.error("Error fetching therapists", error);
      });
  }, []);

  return providers;
};

