import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../../state/slices/studentSlice";
import { nanoid } from "@reduxjs/toolkit";
import H3 from "../../headings/H3";

const ManualUploadArea = () => {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(addStudent({ name: content, id: nanoid() }));
        setContent("");
    }

    return (
        <div className="w-full max-w-[600px] mx-auto p-6 bg-white rounded-xl shadow-md">
            <H3 value="Add students manually:" />

            <div className="flex flex-row justify-between gap-2">
                <input
                    className="border-2 px-3 py-1 w-full rounded-lg"
                    onChange={(c) => setContent(c.target.value)}
                    maxLength={20}
                    value={content}
                    placeholder="John Doe"
                />

                <button
                    onClick={handleSubmit}
                    className="px-5 py-1 bg-green-500 hover:bg-green-600 transition-colors rounded-lg"
                >
                    <span className="flex justify-center items-center text-white font-bold text-2xl">+</span>
                </button>
            </div>
        </div>
    );
};

export default ManualUploadArea;
