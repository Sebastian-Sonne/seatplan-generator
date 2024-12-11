import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import studentReducer from './slices/studentSlice'
import gridReducer from './slices/gridSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        students: studentReducer,
        grid: gridReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;