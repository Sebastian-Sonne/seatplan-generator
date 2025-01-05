import { useEffect, useState } from 'react';
import Container from "../Container";
import H2 from "../headings/H2";
import H4 from '../headings/H4';
import { useDispatch, useSelector } from 'react-redux';
import { setExport } from '../../state/slices/appSlice';
import { selectAllStudent } from '../../state/slices/studentSlice';
import { RootState } from '../../state/store';
import { generateLink } from '../../service/link.service';

const ExportScreen = () => {
    const dispatch = useDispatch();

    const students = useSelector(selectAllStudent);
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);
    const link = generateLink(deskSetup, students);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                dispatch(setExport(false));
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    return (
        <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 backdrop-blur-sm">
            <Container layout="max-w-[600px]">
                <div className='flex flex-row justify-between items-center pr-2'>
                    <H2 value="Export" />
                    <button onClick={() => dispatch(setExport(false))} className='px-4 aspect-square mb-2 hover:bg-error text-text font-bold transition-colors rounded-lg'>X</button>
                </div>

                <div className="flex items-center">
                    <input
                        className='w-60 bg-card text-text border-element border-y-2 border-l-2 rounded-l-lg py-2 pl-2 font-medium'
                        value={link}
                        disabled
                    />

                    <CopyButton link={link} copied={copied} setCopied={setCopied} />

                </div>
                {copied && <h6 className='font-semibold text-sm text-text-muted pl-2'>Copied to clipboard</h6>}
            </Container>
        </div>
    );
};
export default ExportScreen;

interface CopyButtonProps {
    link: string;
    copied: boolean;
    setCopied: React.Dispatch<React.SetStateAction<boolean>>;
}
const CopyButton: React.FC<CopyButtonProps> = ({ link, copied, setCopied }) => {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
    };

    return (
        <button
            onClick={handleCopyClick}
            className={`pl-4 py-2 pr-4 border-default border-2 rounded-r-lg hover:bg-hover ${copied && "border-hover"} transition-colors`}
            aria-label="Copy link to clipboard"
        >
            <H4 value='Copy' />
        </button>
    );
};