import styled from "styled-components";
import { useEffect, useState } from "react";

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
  max-width: 32rem;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;

const CancelButton = styled.button`
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

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background: ${({ disabled, theme }) =>
        disabled ? "#cccccc" : theme.primaryDark};
  color: white;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

interface FormModalProps<T> {
    isOpen: boolean;
    title?: string;
    initialValues: T;
    onSubmit: (values: T) => void;
    onCancel: () => void;
    renderFields: (
        values: T,
        setValues: React.Dispatch<React.SetStateAction<T>>,
        setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
    ) => React.ReactNode;
    saveLabel?: string;
    cancelLabel?: string;
}

export default function FormModal<T>({
    isOpen,
    title = "Modifica",
    initialValues,
    onSubmit,
    onCancel,
    renderFields,
    saveLabel = "Salva",
    cancelLabel = "Annulla",
}: FormModalProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setValues(initialValues);
        setIsValid(false);
    }, [initialValues, isOpen]);

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalContent>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(values);
                    }}
                >
                    <div className="space-y-4">{renderFields(values, setValues, setIsValid)}</div>

                    <div className="flex justify-end gap-2 mt-6">
                        <CancelButton type="button" onClick={onCancel}>
                            {cancelLabel}
                        </CancelButton>
                        <SaveButton type="submit" disabled={!isValid}>{saveLabel}</SaveButton>
                    </div>
                </form>
            </ModalContent>
        </ModalWrapper>
    );
}
