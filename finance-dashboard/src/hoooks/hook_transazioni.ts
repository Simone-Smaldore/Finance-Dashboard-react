import { useMutation, useQuery } from "@tanstack/react-query";
import type { Transazione } from "../model/Transazione";
import {
    deleteTransazione,
    getTransazioni,
    createTransazione,
    updateTransazione,
} from "../services/transactionsService";
import { queryClient } from "../main";

/**
 * GET tutte le transazioni
 */
export const useTransazioni = () => {
    return useQuery<Transazione[]>({
        queryKey: ["transazioni"],
        queryFn: getTransazioni,
        staleTime: 1000 * 60 * 5, // 5 minuti
    });
};

/**
 * DELETE una transazione
 */
export const useDeleteTransazione = () => {
    return useMutation<void, Error, number>({
        mutationFn: (id: number) => deleteTransazione(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData<Transazione[]>(["transazioni"], (old) =>
                old ? old.filter((t) => t.id !== id) : []
            );
        },
    });
};

/**
 * CREATE una nuova transazione
 * 
 * `data` deve contenere:
 *   - id_conto (number)
 *   - transazione: senza `id`, `id_utente`, `id_conto`
 */
export const useCreateTransazione = () => {
    return useMutation<
        Transazione, // valore di ritorno
        Error,       // tipo di errore
        {
            id_conto: number;
            transazione: Transazione;
        }
    >({
        mutationFn: ({ id_conto, transazione }) =>
            createTransazione(id_conto, transazione),
        onSuccess: (newTransazione) => {
            queryClient.setQueryData<Transazione[]>(["transazioni"], (old) =>
                old ? [...old, newTransazione] : [newTransazione]
            );
        },
    });
};

/**
 * UPDATE una transazione esistente
 * 
 * `data` deve contenere:
 *   - id (number)
 *   - updates: oggetto parziale con i campi modificati
 */
export const useUpdateTransazione = () => {
    return useMutation<
        Transazione, // valore di ritorno
        Error,       // tipo di errore
        {
            id: number;
            updates: Transazione;
        }
    >({

        mutationFn: ({ id, updates }) => updateTransazione(id, updates),
        onSuccess: (updatedTransazione) => {
            queryClient.setQueryData<Transazione[]>(["transazioni"], (old) =>
                old
                    ? old.map((t) =>
                        t.id === updatedTransazione.id
                            ? updatedTransazione
                            : t
                    )
                    : [updatedTransazione]
            );
        },
    });
};
