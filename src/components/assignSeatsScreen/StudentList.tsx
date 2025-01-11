import { useSelector } from "react-redux";
import H2 from "../headings/H2"
import StudentCard from "./StudentCard"
import { selectStudentIds } from "../../state/slices/studentSlice";
import { useRef, useState, useEffect } from "react";

const StudentList = () => {
    const studentIds = useSelector(selectStudentIds);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                setIsOverflowing(scrollContainer.scrollWidth > scrollContainer.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, [studentIds]);

    return (
        <>
            <H2 value="Drag and drop students to a desks" />
            <div className="relative px-2 rounded-lg border border-transparent hover:border-border transition-colors">
                <div
                    ref={scrollContainerRef}
                    className="flex flex-row overflow-x-scroll gap-2"
                >
                    {studentIds.map((studendId, _) => (
                        <StudentCard key={studendId} id={studendId} />
                    ))}
                </div>

                {/*overflow shadow if applicable*/}
                {isOverflowing && (
                    <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-background rounded-lg to-transparent pointer-events-none"></div>
                )}
            </div>
        </>
    )
}
export default StudentList