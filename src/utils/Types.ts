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

interface iNotification {
  id?: number;
  therapistId: number;
  apptTime: string;
  roomNumber: string;
}

interface iForm {
  apptTime: string;
  roomNumber: string;
  therapistId: number;
}

export type { Room, Therapist, iNotification, iForm };