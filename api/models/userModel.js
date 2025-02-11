import { prisma } from '../prisma/client.js';

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      followers: {
        include: {
          follower: true,
        },
      },
      following: {
        include: {
          following: true,
        },
      },
    },
  });
};

export const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};
