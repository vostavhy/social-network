import { prisma } from '../prisma/client.js';

export const follow = async (followerId, followingId) => {
  await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
};

export const unfollow = async (followerId, followingId) => {
  await prisma.follow.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
};

export const isFollowing = async (followerId, followingId) => {
  const count = await prisma.follow.count({
    where: {
      followerId,
      followingId,
    },
  });

  return count > 0;
};
