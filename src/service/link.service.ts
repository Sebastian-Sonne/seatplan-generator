import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

const generateLink = (deskSetup: Desk[][], students: Student[]) => {
    const url = new URL(window.location.href);

    const params: { layout: Desk[][], students: Student[] } = {
        layout: deskSetup,
        students: students,
    };

    Object.keys(params).forEach((key) => {
        const typedKey = key as keyof typeof params;
        url.searchParams.append(typedKey, JSON.stringify(params[typedKey]));
    });

    return url.toString();
};
export default generateLink