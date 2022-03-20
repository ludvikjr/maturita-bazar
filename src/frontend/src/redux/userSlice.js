import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedUser: {},
  userReviews: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser: (state, payload) => {
      state.loggedUser = {
        username: payload,
      };
      console.log(state.loggedUser);
    },
    setUserReviews: (state, user) => {
      state.userReviews = [...state.userReviews, user.payload];
    },
  },
});

export const { setLoggedUser } = userSlice.actions;

export default userSlice.reducer;
