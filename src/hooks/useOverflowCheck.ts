import { useState, useEffect } from "react";

const useOverflowCheck = (ref: React.RefObject<HTMLDivElement>, dependencies: any[]) => {
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (ref.current) {
                setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, dependencies);

    return isOverflowing;
};
export default useOverflowCheck