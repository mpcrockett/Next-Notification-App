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
        return setProviders(data.providers);
      })
      .catch((error) => {
        console.error("Error fetching therapists", error);
      });
  }, []);

  return providers;
};

