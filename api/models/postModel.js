import prisma from '../prisma/client.js';

export const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

export const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      user: true,
    },
  });
};

export const createPost = async (data) => {
  return await prisma.post.create({
    data,
  });
};

export const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: {
      id,
    },
    data,
  });
};

export const deletePost = async (id) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};
