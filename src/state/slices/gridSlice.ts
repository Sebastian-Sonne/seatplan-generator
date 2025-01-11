import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coordinates {
    row: number;
    col: number
}

export interface RowColCoordinates {
    type: "row" | "col" | null;
    index: number;
}

export interface Desk {
    deskState: -1 | 1; // -1 = no desk, 1 = desk
    studentId: string | null;
}

interface Gridstate {
    deskSetup: Desk[][];
    activeHeader: RowColCoordinates;
    hoverState: RowColCoordinates;
    numberOfDesks: number;
}

const createEmptyGrid = (rows: number, cols: number): Desk[][] => {
    return Array(rows)
        .fill(0)
        .map(() =>
            Array(cols)
                .fill({
                    deskState: -1,
                    studentId: null,
                }))
};

const initialState: Gridstate = {
    deskSetup: createEmptyGrid(5, 5),
    activeHeader: {
        type: null,
        index: -1,
    },
    hoverState: {
        type: null,
        index: -1,
    },
    numberOfDesks: 0,
}

const gridSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addDesk: (state, action: PayloadAction<Coordinates>) => {
            const cell = state.deskSetup[action.payload.row][action.payload.col];
            if (cell.deskState === -1) {
                cell.deskState = 1;
                state.numberOfDesks++;
            }
        },
        removeDesk: (state, action: PayloadAction<Coordinates>) => {
            const cell = state.deskSetup[action.payload.row][action.payload.col];
            if (cell.deskState === 1) {
                cell.deskState = -1;
                cell.studentId = null;
                state.numberOfDesks--;
            }
        },
        setDeskGrid: (state, action: PayloadAction<Desk[][]>) => {
            state.deskSetup = action.payload;
            state.numberOfDesks = action.payload.flat().filter(desk => desk.deskState === 1).length;
        },
        resetDesks: (state) => {
            const numRows = state.deskSetup.length;
            const numCols = state.deskSetup[0]?.length;

            state.deskSetup = createEmptyGrid(numRows, numCols)

            state.numberOfDesks = 0;
        },
        resetGrid: (state) => {
            state.deskSetup = createEmptyGrid(5, 5);
            state.numberOfDesks = 0;
        },

        setActiveHeader: (state, action: PayloadAction<RowColCoordinates>) => {
            state.activeHeader = action.payload;
        },
        setHoverState: (state, action: PayloadAction<RowColCoordinates>) => {
            state.hoverState = action.payload;
        },

        add: (state, action: PayloadAction<RowColCoordinates>) => {
            const { type, index } = action.payload;

            if (type === "row") {
                const newRow = Array(state.deskSetup[0]?.length || 0).fill({ deskState: -1, studentId: null });
                state.deskSetup.splice(index, 0, newRow);
            } else {
                state.deskSetup.forEach((deskRow) => {
                    deskRow.splice(index, 0, { deskState: -1, studentId: null });
                });
            }
        },
        remove: (state, action: PayloadAction<RowColCoordinates>) => {
            const { type, index } = action.payload;

            if (type === "row") {
                if (state.deskSetup.length > 1) {
                    state.deskSetup.splice(index, 1);
                }
            } else {
                if (state.deskSetup[0].length > 1) {
                    state.deskSetup.forEach((deskRow) => {
                        if (index < deskRow.length) {
                            deskRow.splice(index, 1);
                        }
                    });
                }
            }

            state.numberOfDesks = state.deskSetup.flat().filter(desk => desk.deskState === 1).length;
        },
        set: (state, action: PayloadAction<RowColCoordinates>) => {
            const { type, index } = action.payload;

            if (type === "row") {
                //determine the majority of the column, in order to set all desks in the row opposite to the majority
                const row = state.deskSetup[index];
                const deskCount = row.filter(desk => desk.deskState === 1).length;
                const noDeskCount = row.length - deskCount;
                const majority = deskCount > noDeskCount ? -1 : 1;

                state.deskSetup[index] = row.map(desk => ({
                    ...desk,
                    deskState: majority
                }));
            } else if (type === "col") {
                //determine the majority of the column, in order to set all desks in the column opposite to the majority
                const col = state.deskSetup.map(row => row[index]);
                const deskCount = col.filter(desk => desk.deskState === 1).length;
                const noDeskCount = col.length - deskCount;
                const majority = deskCount > noDeskCount ? -1 : 1;

                state.deskSetup.forEach(row => {
                    row[index] = {
                        ...row[index],
                        deskState: majority
                    };
                });
            }

            state.numberOfDesks = state.deskSetup.flat().filter(desk => desk.deskState === 1).length;
        },


        purgeEmptyEdges: (state) => {
            const { deskSetup } = state;

            //top rows
            while (deskSetup.length > 0 && deskSetup[0].every(cell => cell.deskState === -1)) {
                deskSetup.shift();
            }

            //bottom rows
            while (deskSetup.length > 0 && deskSetup[deskSetup.length - 1].every(cell => cell.deskState === -1)) {
                deskSetup.pop();
            }

            //left cols
            while (
                deskSetup[0]?.length > 0 &&
                deskSetup.every(row => row[0].deskState === -1)
            ) {
                deskSetup.forEach(row => row.shift());
            }

            //right cols
            while (
                deskSetup[0]?.length > 0 &&
                deskSetup.every(row => row[row.length - 1].deskState === -1)
            ) {
                deskSetup.forEach(row => row.pop());
            }
        },

        clearDeskAssignments: (state) => {
            state.deskSetup.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.deskState === 1) cell.studentId = null;
                })
            );
        },
        assignStudent: (state, action: PayloadAction<{row: number, col: number, id: string}>) => {
            const {row, col, id} = action.payload;
            state.deskSetup[row][col].studentId = id;
        },
    },
});

export const { addDesk,
    removeDesk,
    setActiveHeader,
    setHoverState, setDeskGrid,
    resetDesks,
    resetGrid,
    add,
    remove,
    set,
    assignStudent,
    clearDeskAssignments,
    purgeEmptyEdges } = gridSlice.actions;
export default gridSlice.reducer;