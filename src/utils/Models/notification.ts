
import prisma from "../../../prisma/client";
import { iNotification} from "../Types";

export const createNotification = async (notification: iNotification) => {
  try {
    return await prisma.notification.create({
      data: {
        therapistId: Number.parseInt(notification.therapistId),
        apptTime: notification.apptTime,
        roomNumber: notification.roomNumber,
      },
    });
  } catch (error: any) {
    console.log('Something went wrong');
  }
};

export const getNotifications = async () => {
  try {
    return await prisma.notification.findMany();
  } catch (error) {
    console.log({error: error})
  }
};