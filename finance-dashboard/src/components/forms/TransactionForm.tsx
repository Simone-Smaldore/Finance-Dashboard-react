import { styled } from "styled-components";
import type { Transazione } from "../../model/Transazione";
import { useCallback, useEffect, useState } from "react";

interface TransactionFormProps {
    values: Transazione;
    setValues: React.Dispatch<React.SetStateAction<Transazione>>;
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const BaseInput = styled.input`
    width: 100%;
    border: 1px solid;
    padding: 0.25rem 0.5rem ;
    border-radius:0.25rem;
`

const DateInput = styled(BaseInput)`
    &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) =>
        theme.mode === "dark"
            ? "invert(100%) brightness(200%)"
            : "none"};
    cursor: pointer;
  }
`;

export default function TransactionForm({ values, setValues, setIsValid }: TransactionFormProps) {


    const [errors, setErrors] = useState<Record<string, string>>({});

    const [touched, setTouched] = useState<Record<string, boolean>>({
        descrizione: false,
        importo: false,
        data_riferimento: false,
        tipologia_spesa: false,
    });


    const validate = useCallback((newValues: Transazione) => {
        const newErrors: Record<string, string> = {};

        if (!newValues.descrizione || newValues.descrizione.trim() === "") {
            newErrors.descrizione = "La descrizione è obbligatoria";
        }
        if (!newValues.tipologia_spesa || newValues.tipologia_spesa.trim() === "") {
            newErrors.tipologia_spesa = "La tipologia è obbligatoria";
        }
        if (!newValues.data_riferimento || newValues.data_riferimento.trim() === "") {
            newErrors.data_riferimento = "La data è obbligatoria";
        }
        if (!newValues.importo || newValues.importo < 0.01) {
            newErrors.importo = "L'importo minimo è un centesimo";
        } else {
            // Controllo massimo 2 decimali
            const decimali = newValues.importo.toString().split(".")[1];
            if (decimali && decimali.length > 2) {
                newErrors.importo = "L'importo può avere al massimo 2 decimali";
            }
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [setErrors, setIsValid]);

    useEffect(() => {
        validate(values);
    }, [values, validate]);

    const handleChange = <K extends keyof Transazione>(field: K, value: Transazione[K]) => {
        const newValues = { ...values, [field]: value };
        setValues(newValues);
        validate(newValues);
    };

    const handleTouched = <K extends keyof Transazione>(field: K) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    return (
        <>
            <div>
                <label className="block text-sm mb-1">Descrizione</label>
                <BaseInput
                    type="text"
                    value={values.descrizione}
                    onChange={(e) => handleChange("descrizione", e.target.value)}
                    onBlur={() => handleTouched("descrizione")}
                />
                {touched.descrizione && errors.descrizione && (
                    <p className="text-red-500 text-xs">{errors.descrizione}</p>
                )}
            </div>
            <div>
                <label className="block text-sm mb-1">Importo</label>
                <BaseInput
                    type="number"
                    value={values.importo}
                    onChange={(e) => handleChange("importo", parseFloat(e.target.value))}
                    onBlur={() => handleTouched("importo")}
                    min={0.01}
                    step={0.01}
                />
                {touched.importo && errors.importo && (
                    <p className="text-red-500 text-xs">{errors.importo}</p>
                )}
            </div>
            <div>
                <label className="block text-sm mb-1">Data</label>
                <DateInput
                    type="date"
                    value={values.data_riferimento?.split("T")[0]}
                    onChange={(e) => handleChange("data_riferimento", e.target.value)}
                    onBlur={() => handleTouched("data_riferimento")}
                />
                {touched.data_riferimento && errors.data_riferimento && (
                    <p className="text-red-500 text-xs">{errors.data_riferimento}</p>
                )}
            </div>
            <div>
                <label className="block text-sm mb-1">Tipologia</label>
                <BaseInput
                    type="text"
                    value={values.tipologia_spesa}
                    onChange={(e) => handleChange("tipologia_spesa", e.target.value)}
                    onBlur={() => handleTouched("tipologia_spesa")}
                />
                {touched.tipologia_spesa && errors.tipologia_spesa && (
                    <p className="text-red-500 text-xs">{errors.tipologia_spesa}</p>
                )}
            </div>
        </>
    );
}
