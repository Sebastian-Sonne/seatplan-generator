import React from 'react';
import { useSelector } from 'react-redux';
import GridElement from './GridElement';
import { RootState } from '../../state/store';
import HeaderElement from './gridElements/HeaderElement';

interface ClassroomGridProps {
    disabled?: boolean;
}
const ClassroomGrid: React.FC<ClassroomGridProps> = ({ disabled = false }) => {
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);

    const columnHeaders = deskSetup[0]?.map((_, colIndex) =>
        String.fromCharCode(65 + colIndex) // Generate "A", "B", "C"...
    ) || [];

    return (
        <div className='overflow-x-auto'>
            <div className="grid gap-2 relative"
                style={{ gridTemplateColumns: `auto repeat(${deskSetup[0]?.length || 1}, minmax(85px, 1fr))` }} >

                {/* Top Left Corner (Empty Cell) */}
                <div></div>

                {columnHeaders.map((header, colIndex) => (
                    <HeaderElement colIndex={colIndex} rowIndex={-1} key={`header-col-${colIndex}`}>
                        {header}
                    </HeaderElement>
                ))}

                {deskSetup.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        <HeaderElement rowIndex={rowIndex} colIndex={-1}>
                            {rowIndex + 1}
                        </HeaderElement>

                        {row.map((_, colIndex) => (
                            <GridElement
                                key={`${rowIndex}-${colIndex}`}
                                row={rowIndex}
                                col={colIndex}
                                disabled={disabled}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default ClassroomGrid;