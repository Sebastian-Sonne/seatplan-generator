import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

interface Appstate {
    step: number;
    exportVisible: boolean;
    shuffled: boolean; //variable possibly prevent shuffle on for saved layout
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
    exportVisible: false,
    shuffled: false,
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
    },
});

export const { setProcessStep, setExport, setShuffled } = appSlice.actions;
export default appSlice.reducer;