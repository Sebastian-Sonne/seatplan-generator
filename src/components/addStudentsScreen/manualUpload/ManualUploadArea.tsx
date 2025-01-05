import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../../state/slices/studentSlice";
import { nanoid } from "@reduxjs/toolkit";
import H3 from "../../headings/H3";
import PrimaryButton from "../../buttons/PrimaryButton";

const ManualUploadArea = () => {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (content === "") {
            setError("Student name must not be of type empty string.");
            return;
        };
        setError(null);
        dispatch(addStudent({ name: content, id: nanoid() }));
        setContent("");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 20) {
            setError("Student name must not exceed 20 characters.");
        } else {
            if (error) setError(null);
            setContent(e.target.value);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <div className="w-full max-w-[600px] mx-auto p-6 bg-card rounded-xl shadow-md">
            <H3 value="Add students manually:" />

            <div className="flex flex-row justify-between gap-2">
                <input
                    className={`border ${error && "!border-error"} px-3 py-1 w-full rounded-lg bg-background border-default text-text`}
                    onChange={(c) => handleChange(c)}
                    value={content}
                    onKeyDown={handleKeyDown}
                    placeholder="John Doe"
                />



                <PrimaryButton onClick={handleSubmit} className="!px-5 !py-1">
                    <span className="flex justify-center items-center font-bold text-2xl">+</span>
                </PrimaryButton>
            </div>

            {error && <p className="text-error text-sm mt-3">{error}</p>}
        </div>
    );
};

export default ManualUploadArea;
