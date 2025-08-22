import { useMutation, useQuery } from "@tanstack/react-query";
import type { Transazione } from "../model/Transazione";
import { deleteTransazione, getTransazioni } from "../services/transactionsService";
import { queryClient } from "../main";

export const useTransazioni = () => {
    return useQuery<Transazione[]>({
        queryKey: ["transazioni"],
        queryFn: getTransazioni,
        staleTime: 1000 * 60 * 5,
    });
};



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


