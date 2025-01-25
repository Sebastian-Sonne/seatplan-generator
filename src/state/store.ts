import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import studentReducer from './slices/studentSlice'
import gridReducer from './slices/gridSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        students: studentReducer,
        grid: gridReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;