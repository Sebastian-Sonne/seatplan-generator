import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { selectStudentById } from "../state/slices/studentSlice";

export const useDeskState = (row: number, col: number) => {
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    const student = useSelector((state: RootState) =>
        deskState?.studentId ? selectStudentById(state, deskState.studentId) : null
    );

    return { deskState, student };
};
