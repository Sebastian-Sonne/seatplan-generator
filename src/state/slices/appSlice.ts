import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const ProcessSteps = {
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
};

interface Appstate {
    step: number;
    deskSetup: number[][],
}

const initialState: Appstate = {
    step: ProcessSteps.STEP_ONE,
    deskSetup: [
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
    ]
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setProcessStep: (state, action: PayloadAction<1 | 2 | 3>) => {
            state.step = action.payload;
        },
        addDesk: (state, action: PayloadAction<{row: number, col: number}>) => {
            state.deskSetup[action.payload.row][action.payload.col] = 1;
        },
        removeDesk: (state, action: PayloadAction<{row: number, col: number}>) => {
            state.deskSetup[action.payload.row][action.payload.col] = -1;
        },
        resetDesks: (state) => {
            state.deskSetup = [
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1],
            ];
        }
    },
});

export const { setProcessStep, addDesk, removeDesk, resetDesks } = appSlice.actions;
export default appSlice.reducer;