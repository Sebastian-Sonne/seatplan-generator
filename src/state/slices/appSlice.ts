import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

interface Appstate {
    step: number;
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
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
    },
});

export const { setProcessStep } = appSlice.actions;
export default appSlice.reducer;