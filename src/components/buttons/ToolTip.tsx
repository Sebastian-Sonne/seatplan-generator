import { useState } from 'react';

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setVisible(true), 500);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutId);
        setVisible(false);
    };

    return (
        <>
            {text ? (
                <div className='relative inline-block'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                    {visible && (
                        <div className='absolute bottom-full left-1/2 -translate-x-1/2 bg-element text-text-muted font-medium text-sm xl:text-nowrap p-2 rounded-lg'>
                            {text}
                        </div>
                    )}
                </div>

            ) : (children)}
        </>
    );
};

export default Tooltip;
