interface Room {
  id: number;
  name: string;
}

interface iUser {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  onboarded: boolean;
  role?: "PROVIDER" | "ADMIN" | "USER";
};

interface iNotification {
  id?: number;
  userId: string;
  apptTime: string;
  roomNumber: string;
  message?: string
}

interface iForm {
  apptTime: string;
  roomNumber: string;
  userId: number;
  message?: string;
}

interface iRegistrationForm {
  email: string,
  name: string,
  phone: string,
  password: string,
  confirmPassword: string,
  accessCode: string
}

export type { Room, iNotification, iForm, iUser, iRegistrationForm };