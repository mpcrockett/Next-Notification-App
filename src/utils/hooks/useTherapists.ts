import { useState, useEffect } from 'react';
import { Therapist } from '../Types';

export default function useTherapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    fetch('/api/therapists')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        return setTherapists(data.therapists);
      })
      .catch((error) => {
        console.error("Error fetching therapists", error);
      });
  }, []);

  return therapists;
};

