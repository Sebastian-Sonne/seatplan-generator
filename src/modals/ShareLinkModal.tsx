import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useSelector } from "react-redux";
import { selectAllStudent } from "../state/slices/studentSlice";
import { RootState } from "../state/store";
import { generateLink } from "../service/link.service";
import CopyButton from "../components/buttons/CopyButton";
import { useI18n } from "../hooks/useI18n";

const ShareLinkModal = () => {
    const [copied, setCopied] = useState(false);
    const t = useI18n();

    const students = useSelector(selectAllStudent);
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);

    const link = generateLink(deskSetup, students);

    return (
        <>
            <div className="flex items-center">
                <input
                    className='w-full bg-card text-text-muted border-element border-y-2 border-l-2 rounded-l-lg py-2 pl-2 font-medium'
                    value={link}
                    disabled
                />

                <CopyButton link={link} copied={copied} setCopied={setCopied} />

            </div>
            {copied && <h6 className='font-semibold text-sm text-success pl-2'>{t("components.export.copiedToClipboard")}</h6>}
        </>
    )
};

export const useShareLinkModal = () => {
    const { showModal, hideModal } = useModal();
    return () => showModal({
        title: "Export your Seatplan",
        component: <ShareLinkModal />,
        confirmText: "Done",
        cancelText: "Cancel",
        onCancel: hideModal
    });
};