import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.toggleColor};  
  color: ${({ theme }) => theme.text};            
  padding: 1.5rem;
  border-radius: 1rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;

const AnnullaButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background: ${({ theme }) => theme.primaryDark};
  color: white;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    isOpen,
    title = "Sei sicuro?",
    message = "Questa azione non può essere annullata.",
    confirmLabel = "Conferma",
    cancelLabel = "Annulla",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalContent>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-2">
                    <AnnullaButton
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </AnnullaButton>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
}
