import { useState, useEffect } from 'react';
import { iUser } from '../Types';

export default function useTherapists() {
  const [therapists, setTherapists] = useState<iUser[]>([]);

  useEffect(() => {
    fetch('/api/providers')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        return setTherapists(data.providers);
      })
      .catch((error) => {
        console.error("Error fetching therapists", error);
      });
  }, []);

  return therapists;
};

