import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    setToken(state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export const saveUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
    dispatch(setToken(user.token));
  };
};

export default userSlice.reducer;
