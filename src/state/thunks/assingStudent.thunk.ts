import { createAsyncThunk } from "@reduxjs/toolkit";
import { assignStudent as gridAssign, Coordinates } from "../slices/gridSlice";
import { setIsAssigned } from "../slices/studentSlice";
import { RootState } from "../store";

export const assignStudent = createAsyncThunk(
    'students/assignStudent',
    async ({ id, coords }: { id: string, coords: Coordinates }, { getState, dispatch }) => {
        const state = getState() as RootState;

        const prevStudentId = state.grid.deskSetup[coords.row][coords.col].studentId;
        if (prevStudentId) {
            dispatch(setIsAssigned({ id: prevStudentId, val: false }))
        }

        dispatch(gridAssign({ ...coords, id }));
        dispatch(setIsAssigned({ id, val: true }))
    }
)