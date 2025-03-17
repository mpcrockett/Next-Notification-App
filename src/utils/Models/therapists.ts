"use server";
import prisma from '../../../prisma/client';
import { iUser } from '../Types';

export const createUser = async (user: iUser) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
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
}