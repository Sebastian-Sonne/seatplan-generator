import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTheme, setTheme } from "../../service/storage.service";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

export const getUserPreferedTheme = (): 'dark' | 'light' => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

interface Appstate {
    step: number;
    exportVisible: boolean;
    shuffled: boolean; //variable to possibly prevent reshuffle on load for url-shared layout
    theme: string;
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
    exportVisible: false,
    shuffled: false,
    theme: ('theme' in localStorage) ? getTheme() : getUserPreferedTheme(),
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setProcessStep: (state, action: PayloadAction<1 | 2 | 3>) => {
            state.step = action.payload;
            //update url params
            const params = new URLSearchParams(window.location.search);
            params.set('tab', action.payload.toString());
            window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
        },
        setExport: (state, action: PayloadAction<boolean>) => {
            state.exportVisible = action.payload;
        },
        setShuffled: (state, action: PayloadAction<boolean>) => {
            state.shuffled = action.payload;
        },
        toggleTheme: (state) => {
            const newTheme = (state.theme === 'dark') ? 'light' : 'dark';
            setTheme(newTheme);
            state.theme = newTheme;
        },
    },
});

export const { setProcessStep, setExport, setShuffled } = appSlice.actions;
export default appSlice.reducer;