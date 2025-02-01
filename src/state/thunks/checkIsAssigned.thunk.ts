import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { forceClearStudentAssignements, setIsAssigned } from "../slices/studentSlice";
import { Desk } from "../slices/gridSlice";

export const checkIsAssigned = createAsyncThunk(
    'students/checkIsAssigned',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;

        dispatch(forceClearStudentAssignements());

        const occupiedDesks: Desk[] = [];
        state.grid.deskSetup.forEach((row, _) => {
            row.forEach((desk, _) => {
                if (desk.deskState === 1 && desk.studentId) {
                    occupiedDesks.push(desk);
                }
            });
        });

        occupiedDesks.forEach(desk => {
            if (desk.studentId) {
                dispatch(setIsAssigned({ id: desk.studentId, val: true }));
            }
        })
    }
)