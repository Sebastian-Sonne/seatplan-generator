import AddedStudentsArea from "./addedStudents/AddedStudentsArea";
import Continue from "./components/Continue";
import FileUploadArea from "./fileUpload/UploadFileArea";
import ManualUploadArea from "./manualUpload/ManualUploadArea";
import { useEffect, useRef, useState } from "react";

const AddStudentsScreen = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow =
          contentRef.current.scrollHeight > window.innerHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div ref={contentRef} className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-4">
          <FileUploadArea />
          <ManualUploadArea />
        </div>

        <AddedStudentsArea />
      </div>

      <div className={"" + isOverflowing && "sticky bottom-0"} >
        <Continue />
      </div>
    </div>
  );
};
export default AddStudentsScreen;