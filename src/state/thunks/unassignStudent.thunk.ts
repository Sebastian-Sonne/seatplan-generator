import { createAsyncThunk } from "@reduxjs/toolkit";
import { assignStudent, Coordinates } from "../slices/gridSlice";
import { setIsAssigned } from "../slices/studentSlice";
import { RootState } from "../store";

export const unAssignStudent = createAsyncThunk(
    'students/unAssignStudent',
    async ({ coords }: { coords: Coordinates }, { getState, dispatch }) => {
        const state = getState() as RootState;
        const studentId = state.grid.deskSetup[coords.row][coords.col].studentId;

        if (studentId) {
            dispatch(setIsAssigned({ id: studentId, val: false }));
            dispatch(assignStudent({ row: coords.row, col: coords.col, id: null }))
        }
    }
)