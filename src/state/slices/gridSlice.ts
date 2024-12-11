import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Coordinates {
    row: number;
    col: number
}

interface Gridstate {
    deskSetup: number[][],
    numberOfDesks: number,
}

const initialState: Gridstate = {
    deskSetup: [
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
    ],
    numberOfDesks: 0,
}

const gridSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addDesk: (state, action: PayloadAction<Coordinates>) => {
            if (state.deskSetup[action.payload.row][action.payload.col] === -1) {
                state.deskSetup[action.payload.row][action.payload.col] = 1;
                state.numberOfDesks++;
            }
        },
        removeDesk: (state, action: PayloadAction<Coordinates>) => {
            if (state.deskSetup[action.payload.row][action.payload.col] === 1) {
                state.deskSetup[action.payload.row][action.payload.col] = -1;
                state.numberOfDesks--;
            }
        },
        resetDesks: (state) => {
            const numRows = state.deskSetup.length;
            const numCols = state.deskSetup[0]?.length || 0;

            state.deskSetup = Array(numRows)
                .fill(0)
                .map(() => Array(numCols).fill(-1));

            state.numberOfDesks = 0;
        },
        addRow: (state) => {
            const newRow = new Array(state.deskSetup[0].length).fill(-1);
            state.deskSetup = [...state.deskSetup, newRow];
        },
        removeRow: (state) => {
            if (state.deskSetup.length > 0) {
                const desksInLastRow = state.deskSetup[state.deskSetup.length - 1].filter(
                    (cell) => cell === 1
                ).length;
                state.numberOfDesks -= desksInLastRow;
                state.deskSetup = state.deskSetup.slice(0, -1);
            }
        },
        addCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) => [...row, -1]);
        },
        removeCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) => {
                if (row.length > 0) {
                    if (row[row.length - 1] === 1) {
                        state.numberOfDesks--;
                    }
                    return row.slice(0, -1);
                }
                return row;
            });
        },

    },
});

export const { addDesk, removeDesk, resetDesks, addCol, addRow, removeCol, removeRow } = gridSlice.actions;
export default gridSlice.reducer;