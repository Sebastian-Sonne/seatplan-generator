import { createAsyncThunk } from "@reduxjs/toolkit";
import { assignStudent as gridAssign, Coordinates } from "../slices/gridSlice";
import { setIsAssigned } from "../slices/studentSlice";

export const assignStudent = createAsyncThunk(
    'students/assignStudent',
    async ({ id, coords }: { id: string, coords: Coordinates }, { dispatch }) => {
        dispatch(gridAssign({ ...coords, id }));
        dispatch(setIsAssigned({ id, val: true }))
    }
)