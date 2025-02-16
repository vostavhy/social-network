import { api } from './api';

export const followApi = api.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation<void, { followingId: string }>({
      query: ({ followingId }) => ({
        url: `/api/followers`,
        method: 'POST',
        body: { followingId },
      }),
    }),
    unFollowUser: build.mutation<void, string>({
      query: (followingId) => ({
        url: `/api/followers/${followingId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi;

export const {
  endpoints: { followUser, unFollowUser },
} = followApi;
