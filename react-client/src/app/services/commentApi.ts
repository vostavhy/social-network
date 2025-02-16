import { api } from './api';
import { Comment } from '../../utils/types';

export const commentApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<Comment, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `/api/comments`,
        method: 'POST',
        body: { postId, content },
      }),
    }),
    deleteComment: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi;

export const {
  endpoints: { createComment, deleteComment },
} = commentApi;
