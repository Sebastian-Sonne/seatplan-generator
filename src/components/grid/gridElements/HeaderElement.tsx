import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setActiveHeader } from "../../../state/slices/gridSlice";

interface HeaderElementProps {
    children: React.ReactNode;
    colIndex?: number;
    rowIndex?: number;
}
const HeaderElement: React.FC<HeaderElementProps> = ({ children, colIndex = -1, rowIndex = -1 }) => {
    const { type: activeType, index: activeIndex } = useSelector((state: RootState) => state.grid.activeHeader);
    const isActive = activeType === "row" ? activeIndex === rowIndex :
        (activeType === "col") ? activeIndex === colIndex : false;

    const dispatch = useDispatch();
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    const handleMouseEnter = () => {
        setContextMenuVisible(true)
    }

    const handleMouseLeave = () => {
        setContextMenuVisible(false)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setActiveHeader({
            type: colIndex === -1 ? "row" : "col",
            index: colIndex === -1 ? rowIndex : colIndex,
        }));
    }

    const handleGlobalClick = () => {
        setContextMenuVisible(false);
        dispatch(setActiveHeader({
            type: null,
            index: -1,
        }))
    };

    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative flex justify-center items-center hover:bg-gray-100 text-gray-500 font-semibold py-1 px-1.5 rounded-md border cursor-pointer transition-colors"
        >
            <>
                {children}
                {(contextMenuVisible || isActive) && <ContextMenu />}
            </>
        </div>
    )
}
export default HeaderElement
