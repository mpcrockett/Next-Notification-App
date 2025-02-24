import prisma from "../../../prisma/client";
import { Notification } from "../Types";

export const createNotification = async (notification: Notification) => {
  try {
    return await prisma.notification.create({
      data: {
        therapistId: notification.therapistId,
        apptTime: notification.apptTime,
        roomNumber: notification.roomNumber,
      },
    });
  } catch (error) {
    console.log(error)
  }
};