import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Coordinates {
    row: number;
    col: number
}

interface Gridstate {
    deskSetup: number[][],
}

const initialState: Gridstate = {
    deskSetup: [
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
    ],
}

const gridSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addDesk: (state, action: PayloadAction<Coordinates>) => {
            state.deskSetup[action.payload.row][action.payload.col] = 1;
        },
        removeDesk: (state, action: PayloadAction<Coordinates>) => {
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
        },
        addRow: (state) => {
            const newRow = new Array(state.deskSetup[0].length).fill(-1);
            state.deskSetup = [...state.deskSetup, newRow];
        },
        removeRow: (state) => {
            if (state.deskSetup.length > 0) {
                state.deskSetup = state.deskSetup.slice(0, -1);
            }
        },
        addCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) => [...row, -1]);
        },
        removeCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) =>
                row.length > 0 ? row.slice(0, -1) : row
            );
        },

    },
});

export const { addDesk, removeDesk, resetDesks, addCol, addRow, removeCol, removeRow } = gridSlice.actions;
export default gridSlice.reducer;