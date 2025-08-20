import { useQuery } from "@tanstack/react-query";
import type { Transazione } from "../model/Transazione";
import { getTransazioni } from "../services/transactionsService";

export const useTransazioni = () => {
    return useQuery<Transazione[]>({
        queryKey: ["transazioni"],
        queryFn: getTransazioni,
        staleTime: 1000 * 60 * 5,
    });
};



// export const useDeleteTransazione = () => {
//     return useMutation<void, Error, number>({
//         mutationFn: (id: number) => deleteTransazioneService(id),
//         onSuccess: (_, id) => {
//             queryClient.setQueryData<Transazione[]>(["transazioni"], (old) =>
//                 old ? old.filter((t) => t.id !== id) : []
//             );
//         },
//     });
// };



// Nel componente:
// import { useDeleteTransazione } from "../hooks/useDeleteTransazione";

// const { mutate: deleteTransazione } = useDeleteTransazione();

// <button onClick={() => deleteTransazione(t.id)}>Cancella</button>