import { prisma } from '../prisma/client.js';

export const like = async (userId, postId) => {
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  return like;
};

export const unlike = async (userId, postId) => {
  await prisma.like.deleteMany({
    where: {
      userId,
      postId,
    },
  });
};

export const getLike = async (userId, postId) => {
  return await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
};
