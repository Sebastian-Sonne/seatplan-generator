import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import studentReducer from './slices/studentSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        students: studentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;