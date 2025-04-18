"use server";
import prisma from '../client';
import { iUser } from '../Types';

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
    console.log(error)
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
    console.log("Hit the getTherapists function", providers);
    return providers;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const checkUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if(!user) return false
    return true;
    } catch (error) {
    console.log(error)
  }
};