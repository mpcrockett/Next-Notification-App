"use server";
import { Prisma } from "@prisma/client";
import prisma from "../client";
import { iNotification} from "../Types";
import logger from '../logger';

export const createNotification = async (notification: iNotification) => {
  try {
    return await prisma.notification.create({
      data: {
        userId: notification.userId,
        apptTime: notification.apptTime,
        roomNumber: notification.roomNumber,
        message: notification.message
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error('Prisma error:', error.message);
      return { error: error.message, code: error.code };
    }

    logger.error('Unknown error:', error);
    return { error: 'An unexpected error occurred' };
  }
};

export const getNotifications = async () => {
  try {
    return await prisma.notification.findMany();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error('Prisma error:', error.message);
      return { error: error.message, code: error.code };
    }
    logger.error('Unknown error:', error);
    return { error: 'An unexpected error occurred' };
  }
};