import { Post } from '../../utils/types';
import { api } from './api';

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<Post, { content: string }>({
      query: (body) => ({
        url: '/api/posts',
        method: 'POST',
        body,
      }),
    }),
    getPosts: build.query<Post[], void>({
      query: () => ({
        url: '/api/posts',
        method: 'GET',
      }),
    }),
    getPostById: build.query<Post, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'GET',
      }),
    }),
    updatePost: build.mutation<Post, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/posts/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deletePost: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

export const {
  endpoints: { createPost, getPosts, getPostById, updatePost, deletePost },
} = postApi;
