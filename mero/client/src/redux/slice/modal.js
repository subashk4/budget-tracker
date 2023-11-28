import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    id: '',
    error: false,
    success: false,
    message: '',
  },
  reducers: {
    handleOpen: (state, { payload }) => {
      // console.log('handle open');
      state.open = true;

      if (payload) {
        const { id, success, error, message } = payload;
        if (typeof id !== 'undefined') state.id = id;
        if (typeof success !== 'undefined') state.success = success;
        if (typeof error !== 'undefined') state.error = error;
        if (typeof message !== 'undefined') state.message = message;
      }
    },
    handleClose: (state, { payload }) => {
      console.log('handle close');

      state.open = false;

      // if (payload) {
      //   const { success, error, message, id } = payload;
      //   if (typeof id !== 'undefined') state.id = id;
      //   if (typeof success !== 'undefined') state.success = success;
      //   if (typeof error !== 'undefined') state.error = error;
      //   if (typeof message !== 'undefined') state.message = message;
      // }
    },
  },
});

export const { handleOpen, handleClose } = modalSlice.actions;
export default modalSlice.reducer;
