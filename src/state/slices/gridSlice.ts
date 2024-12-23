import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coordinates {
    row: number;
    col: number
}

export interface Desk {
    deskState: -1 | 1; // -1 = no desk, 1 = desk
    studentId: string | null;
}

interface Gridstate {
    deskSetup: Desk[][],
    numberOfDesks: number,
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
        addRow: (state) => {
            const newRow = Array(state.deskSetup[0].length).fill({ deskState: -1, studentId: null });
            state.deskSetup = [...state.deskSetup, newRow];
        },
        removeRow: (state) => {
            if (state.deskSetup.length > 0) {
                const desksInLastRow = state.deskSetup[state.deskSetup.length - 1].filter(
                    (cell) => cell.deskState === 1
                ).length;
                state.numberOfDesks -= desksInLastRow;
                state.deskSetup = state.deskSetup.slice(0, -1);
            }
        },
        addCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) => [...row, { deskState: -1, studentId: null }]);
        },
        removeCol: (state) => {
            state.deskSetup = state.deskSetup.map((row) => {
                if (row.length > 0) {
                    if (row[row.length - 1].deskState === 1) {
                        state.numberOfDesks--;
                    }
                    return row.slice(0, -1);
                }
                return row;
            });
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
        /**
         * function to shuffle and assign students
         * @param state 
         * @param action students ids
         */
        assignStudents: (state, action: PayloadAction<string[]>) => {
            // Collect all desks
            const availableDesks: { row: number; col: number }[] = [];
            state.deskSetup.forEach((row, rowIndex) => {
              row.forEach((cell, colIndex) => {
                if (cell.deskState === 1 && !cell.studentId) {
                  availableDesks.push({ row: rowIndex, col: colIndex });
                }
              });
            });
      
            // Shuffle students and assign to desks
            const shuffledDesks = availableDesks.sort(() => Math.random() - 0.5);
            action.payload.forEach((studentId, index) => {
              if (shuffledDesks[index]) {
                const { row, col } = shuffledDesks[index];
                state.deskSetup[row][col].studentId = studentId;
              }
            });
          },
        clearAssignments: (state) => {
            state.deskSetup.forEach((row) =>
                row.forEach((cell) => {
                    if (cell.deskState === 1) cell.studentId = null;
                })
            );
        },
    },
});

export const { addDesk, removeDesk, setDeskGrid, resetDesks, addCol, addRow, removeCol, removeRow, assignStudents, clearAssignments, purgeEmptyEdges } = gridSlice.actions;
export default gridSlice.reducer;