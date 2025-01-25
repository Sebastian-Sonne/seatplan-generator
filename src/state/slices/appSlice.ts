import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

interface Appstate {
    step: number;
    language: string;
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
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
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            i18n.changeLanguage(action.payload);
        },
    },
});

export const { setProcessStep, setLanguage } = appSlice.actions;
export default appSlice.reducer;