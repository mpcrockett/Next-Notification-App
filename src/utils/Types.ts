interface Room {
  id: number;
  name: string;
}

interface Therapist {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type { Room, Therapist };