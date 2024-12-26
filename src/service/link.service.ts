import pako from "pako";
import { Desk } from "../state/slices/gridSlice";
import { Student } from "../state/slices/studentSlice";

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


export const decodeData = (data: string) => {
    if (!data) {
        throw new Error('No data found in the URL');
    }

    //decode
    const binaryString = atob(data);
    const compressedData = Uint8Array.from(binaryString, char => char.charCodeAt(0));

    //decompress
    const jsonData = pako.inflate(compressedData, { to: 'string' });

    //parse json
    const params = JSON.parse(jsonData);

    console.log(params);

    return params;
};