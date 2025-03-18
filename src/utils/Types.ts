interface Room {
  id: number;
  name: string;
}

interface iUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: "PROVIDER" | "ADMIN";
};

interface iNotification {
  id?: number;
  userId: number;
  apptTime: string;
  roomNumber: string;
}

interface iForm {
  apptTime: string;
  roomNumber: string;
  userId: number;
}

export type { Room, iNotification, iForm, iUser };