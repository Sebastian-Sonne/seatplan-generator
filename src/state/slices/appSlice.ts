import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTheme, setTheme } from "../../service/storage.service";
import i18n from "../../i18n";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

export const getUserPreferedTheme = (): 'dark' | 'light' => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

interface Appstate {
    step: number;
    exportVisible: boolean;
    theme: "dark" | "light";
    language: string;
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
    exportVisible: false,
    theme: ('theme' in localStorage) ? getTheme() : getUserPreferedTheme(),
    language: i18n.language || "en",
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
        toggleTheme: (state) => {
            const newTheme = (state.theme === 'dark') ? 'light' : 'dark';
            setTheme(newTheme);
            state.theme = newTheme;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            i18n.changeLanguage(action.payload);
        },
    },
});

export const { setProcessStep, setExport, toggleTheme, setLanguage } = appSlice.actions;
export default appSlice.reducer;