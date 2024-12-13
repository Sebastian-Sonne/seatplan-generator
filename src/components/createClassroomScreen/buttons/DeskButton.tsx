import React from "react";
import clsx from "clsx";

interface DeskButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    hoverStyle?: string;
    baseStyle?: string;
}

const DeskButton: React.FC<DeskButtonProps> = ({
    onClick,
    children,
    disabled = false,
    hoverStyle = "",
    baseStyle = "",
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "h-16 flex justify-center items-center rounded border transition-all",
                baseStyle,
                !disabled && hoverStyle
            )}
        >
            {children}
        </button>
    );
};

export default DeskButton;
