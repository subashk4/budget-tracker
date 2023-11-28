import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userType: '',
    firstName: '',
    lastName: '',
    id: '',
  },
  reducers: {
    setUser: (state, { payload: { id, userType, firstName, lastName } }) => {
      state.id = id;
      state.userType = userType;
      state.firstName = firstName;
      state.lastName = lastName;
      // state = { ...state, ...payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
