import { createSlice } from '@reduxjs/toolkit/react';
import { User } from '../../utils/types';
import { userApi } from '../../app/services/userApi';
import { RootState } from '../../app/store';

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  currentUser: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState,
    resetUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    }),
      builder.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      }),
      builder.addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logOut, resetUser } = userSlice.actions;
export default userSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUser = (state: RootState) => state.user.user;
