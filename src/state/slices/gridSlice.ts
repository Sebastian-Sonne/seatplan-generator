import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coordinates {
    row: number;
    col: number
}

export interface Desk {
    deskState: -1 | 1; // -1 = no desk, 1 = desk
    studentId: string | null;
}

export interface ActiveHeader {
    type: "row" | "col" | null;
    index: number;
}

export interface HoverState {
    type: "row" | "col" | null;
    index: number;
}

interface Gridstate {
    deskSetup: Desk[][];
    activeHeader: ActiveHeader;
    hoverState: HoverState;
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

        setActiveHeader: (state, action: PayloadAction<ActiveHeader>) => {
            state.activeHeader = action.payload;
        },
        setHoverState: (state, action: PayloadAction<HoverState>) => {
            state.hoverState = action.payload;
        },

        add: (state, action: PayloadAction<ActiveHeader>) => {
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
        remove: (state, action: PayloadAction<ActiveHeader>) => {
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
        
        clearAssignments: (state) => {
            state.deskSetup.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.deskState === 1) cell.studentId = null;
                })
            );
        },
        assignRandomStudents: (state, action: PayloadAction<string[]>) => {
            const availableDesks: { row: number; col: number }[] = [];
            state.deskSetup.forEach((row, rowIndex) => {
                row.forEach((desk, colIndex) => {
                    if (desk.deskState === 1 && !desk.studentId) {
                        availableDesks.push({ row: rowIndex, col: colIndex });
                    }
                });
            });

            const shuffledStudentIds = [...action.payload].sort(() => Math.random() - 0.5);
            const shuffledDesks = availableDesks.sort(() => Math.random() - 0.5);

            shuffledStudentIds.forEach((studentId, index) => {
                if (shuffledDesks[index]) {
                    const { row, col } = shuffledDesks[index];
                    state.deskSetup[row][col].studentId = studentId;
                }
            });
        },
    },
});

export const { addDesk, removeDesk, setActiveHeader, setHoverState, setDeskGrid, resetDesks, resetGrid, add, remove, assignRandomStudents, clearAssignments, purgeEmptyEdges } = gridSlice.actions;
export default gridSlice.reducer;