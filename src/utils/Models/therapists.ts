import prisma from '../../../prisma/client';
import { Therapist } from '../Types';

export const createTherapist = async (therapist: Therapist) => {
  try {
    const newTherapist = await prisma.therapist.create({
      data: {
        name: therapist.name,
        email: therapist.email || '',
        password: therapist.password || '',
      }
    });
    return newTherapist
  } catch (error) {
    console.log(error)
  }
};

export const getTherapists = async () => {
  try {
    const therapists = await prisma.therapist.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    console.log("Hit the getTherapists function");
    return therapists;
  } catch (error) {
    console.log(error);
  }
}