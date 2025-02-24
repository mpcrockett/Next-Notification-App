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

interface Notification {
  id?: number;
  therapistId: number;
  apptTime: string;
  roomNumber: string;
}

export type { Room, Therapist, Notification };