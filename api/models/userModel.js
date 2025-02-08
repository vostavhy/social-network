import { prisma } from '../prisma/client.js';

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const getUserById = async (id) => {
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

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export default { getUserByEmail, getUserById, createUser, updateUser };
