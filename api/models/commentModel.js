import { prisma } from '../prisma/client.js';

export const getComments = async () => {
  return await prisma.comment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const createComment = async (data) => {
  return await prisma.comment.create({
    data,
  });
};

export const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: {
      id,
    },
  });
};
