import { Desk } from "../../../state/slices/gridSlice";

/**
 * function to calculate all available Desks 
 * @param deskSetup 2d array of desk
 * @returns array of available desks (x and y)
 */
export const getAvailableDesks = (deskSetup: Desk[][]) => {
    const availableDesks: { row: number; col: number }[] = [];

    deskSetup.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell.deskState === 1 && !cell.studentId) {
                availableDesks.push({ row: rowIndex, col: colIndex });
            }
        });
    });

    return availableDesks;
}

/**
 * function to assign students randomly to desks
 * @param deskSetup 2d array of desk
 * @param studentIds ids of Students
 * @returns 2d array of desks with assigned student ids
 */
export const shuffleAndAssign = (deskSetup: Desk[][], studentIds: string[]) => {
    const shuffledDeks = getAvailableDesks(deskSetup).sort(() => Math.random() - 0.5);
    const assignedDeskSetup = deskSetup;

    studentIds.forEach((studentId, index) => {
        if (shuffledDeks[index]) {
            const { row, col } = shuffledDeks[index];
            assignedDeskSetup[row][col].studentId = studentId;
        }
    })

    return assignedDeskSetup;
}