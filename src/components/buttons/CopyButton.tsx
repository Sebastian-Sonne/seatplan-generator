import { useI18n } from "../../hooks/useI18n";
import H4 from "../headings/H4";

interface CopyButtonProps {
    link: string;
    copied: boolean;
    setCopied: React.Dispatch<React.SetStateAction<boolean>>;
}
const CopyButton: React.FC<CopyButtonProps> = ({ link, copied, setCopied }) => {
    const t = useI18n();

    const handleCopyClick = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
    };

    return (
        <button
            onClick={handleCopyClick}
            className={`pl-4 py-2 pr-4 border-default border-2 rounded-r-lg hover:bg-hover ${copied && "border-success hover:bg-success"} transition-colors`}
            aria-label="Copy link to clipboard"
        >
            <H4 value={t("common.copy")} />
        </button>
    );
};

export default CopyButton