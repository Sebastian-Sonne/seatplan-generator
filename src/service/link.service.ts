import pako from "pako";
import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

/**
 * function to generate a sharable link of the current seatplan
 * @param deskSetup current desk setup
 * @param students all students
 * @returns encoded and compressed link 
 */
export const generateLink = (deskSetup: Desk[][], students: Student[]) => {
    const url = new URL(window.location.href);

    const params = {
        layout: deskSetup,
        students: students,
    };

    const compressedData = pako.deflate(JSON.stringify(params));

    const base64Data = btoa(String.fromCharCode.apply(null, Array.from(compressedData)));

    url.searchParams.append('data', base64Data);

    return url.toString();
};

/**
 * function to decode compressed and encoded data
 * @param data encoded and compressed data
 * @returns decoded data
 */
export const decodeData = (data: string) => {
    if (!data) {
        throw new Error('No data found in the URL');
    }

    const binaryString = atob(data);
    const compressedData = Uint8Array.from(binaryString, char => char.charCodeAt(0));

    const jsonData = pako.inflate(compressedData, { to: 'string' });

    const params = JSON.parse(jsonData);

    return params;
};