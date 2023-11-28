import { configureStore } from '@reduxjs/toolkit';
import propertySlice from './slice/property';
import modalSlice from './slice/modal';
import userSlice from './slice/user';

export const store = configureStore({
  reducer: {
    property: propertySlice,
    modal: modalSlice,
    user: userSlice,
  },
});
