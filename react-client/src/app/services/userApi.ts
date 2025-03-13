import { User } from '../../utils/types';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string }, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<User, { email: string; password: string; name: string }>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    current: build.query<User, void>({
      query: () => ({
        url: '/auth/current',
        method: 'GET',
      }),
    }),
    getUserById: build.query<User, string>({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<User, { id: string; userData: FormData }>({
      query: ({ id, userData }) => ({
        url: `/auth/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { login, register, current, getUserById, updateUser },
} = userApi;
