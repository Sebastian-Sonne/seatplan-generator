import { createAsyncThunk } from "@reduxjs/toolkit";
import { assignStudent } from "../slices/gridSlice";
import { setIsAssigned } from "../slices/studentSlice";
import { RootState } from "../store";

export const swapStudents = createAsyncThunk(
    'students/swapStudents',
    async ({ row, col, id }: { row: number; col: number; id: string }, { getState, dispatch }) => {
        const state = getState() as RootState;
        const grid = state.grid.deskSetup;

        const oldId = grid[row][col]?.studentId;

        dispatch(assignStudent({ row, col, id }));

        if (oldId) {
            dispatch(setIsAssigned({ id: oldId, val: false }));
        }

        dispatch(setIsAssigned({ id, val: true }));
    }
);
