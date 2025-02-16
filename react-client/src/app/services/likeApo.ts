import { Like } from '../../utils/types';
import { api } from './api';

export const likeApi = api.injectEndpoints({
  endpoints: (build) => ({
    createLike: build.mutation<Like, { postId: string }>({
      query: ({ postId }) => ({
        url: `/api/likes`,
        method: 'POST',
        body: { postId },
      }),
    }),
    deleteLike: build.mutation<void, string>({
      query: (postId) => ({
        url: `/api/likes/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation } = likeApi;
export const {
  endpoints: { createLike, deleteLike },
} = likeApi;
