import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setIsAssigned } from "../slices/studentSlice";
import { assignStudent, clearDeskAssignments } from "../slices/gridSlice";

export const shuffleAssignedStudents = createAsyncThunk(
    'students/shuffleAssignedStudents',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const desks = state.grid.deskSetup

        console.log("desks", desks.length);
        console.log(desks);

        const availableStudents = desks.flat().filter(desk => desk.deskState === 1 && desk.isLocked === false);
        console.log("availableStudents", availableStudents.length);
        console.log(availableStudents);

        const availableStudentIds = availableStudents.map(desk => desk.studentId)
        console.log("availableStudentIds", availableStudentIds.length);
        console.log(availableStudentIds);

        dispatch(clearDeskAssignments());

        const availableDesks = [];
        for (let rowIndex = 0; rowIndex < desks.length; rowIndex++) {
            const row = desks[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                const desk = row[colIndex];
                if (desk.deskState === 1 && desk.isLocked === false) {
                    availableDesks.push({ row: rowIndex, col: colIndex });
                }
            }
        }

        console.log("availableDesks", availableDesks.length);
        console.log(availableDesks);

        const shuffledStudentIds = availableStudentIds.sort(() => Math.random() - 0.5);
        const shuffledDesks = availableDesks.sort(() => Math.random() - 0.5);

        shuffledStudentIds.forEach((studentId, index) => {
            if (shuffledDesks[index]) {
                const { row, col } = shuffledDesks[index];
                if (studentId) {
                    dispatch(setIsAssigned({ id: studentId, val: true }));
                    dispatch(assignStudent({ row: row, col: col, id: studentId }));
                }
            }
        });
    }

    //! fix where studens go missing
)