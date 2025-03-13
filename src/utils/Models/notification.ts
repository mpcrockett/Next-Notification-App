"use server";
import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/client";
import { iNotification} from "../Types";

export const createNotification = async (notification: iNotification) => {
  try {
    return await prisma.notification.create({
      data: {
        therapistId: notification.therapistId,
        apptTime: notification.apptTime,
        roomNumber: notification.roomNumber,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error:', error.message);
      return { error: error.message, code: error.code };
    }

    console.error('Unknown error:', error);
    return { error: 'An unexpected error occurred' };
  }
};

export const getNotifications = async () => {
  try {
    return await prisma.notification.findMany();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma error:', error.message);
      return { error: error.message, code: error.code };
    }
    console.error('Unknown error:', error);
    return { error: 'An unexpected error occurred' };
  }
};