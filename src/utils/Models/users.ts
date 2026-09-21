"use server";
import prisma from '../client';
import { iUser } from '../Types';
import logger from '../logger';

export const createUser = async (user: iUser) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    });
    return newUser;
  } catch (error) {
    logger.error(error)
  }
};

export const getProviders = async () => {
  try {
    const providers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        role: 'PROVIDER',
      }
    });
    return providers;
  } catch (error) {
    logger.error(error);
  }
};

export const getProviderById = async (id: string) => {
  try {
    const provider = await prisma.user.findUnique({
      where: {
        id,
        role: 'PROVIDER'
      }
    });
    return provider;
  } catch (error) {
    logger.error(error)
  }
};

export const updatePhoneNumber = async (id: string, phoneNumber: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { phoneNumber }
    });
    return updatedUser;
  } catch (error) {
    logger.error(error);
  }
};

export const checkUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(!user) return false
    return user;
    } catch (error) {
    logger.error(error)
  }
};

export const setIsProvider = async (userId: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
        data: { role: 'PROVIDER' }
      });
    return 
  } catch (error) {
    logger.error(error)
  }
};