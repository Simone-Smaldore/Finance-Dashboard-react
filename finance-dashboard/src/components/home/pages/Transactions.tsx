import type { Transazione } from "../../../model/Transazione";
import FullscreenSpinner from "../../FullScreenSpinner";
import { FaPen, FaTrash } from "react-icons/fa6";
import { queryClient } from "../../../main";
import { useTransazioni } from "../../../hoooks/hook_transazioni";


function modifyTransaction(id: number) {
    const transazioni = queryClient.getQueryData<Transazione[]>(["transazioni"]) ?? [];
    console.log(transazioni.filter((t: Transazione) => t.id === id))
}

function deleteTransaction(id: number) {
    const transazioni = queryClient.getQueryData<Transazione[]>(["transazioni"]) ?? [];
    console.log(transazioni.filter((t: Transazione) => t.id === id))
}

export default function Transactions() {

    const { data: transazioni = [], isLoading, isError } = useTransazioni();

    if (isLoading) return <FullscreenSpinner />;
    if (isError) return <p className="p-4 text-red-600">Errore nel recupero delle transazioni</p>;

    return (
        <div className="p-6">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-3 py-2">Descrizione</th>
                            <th className="border px-3 py-2">Importo</th>
                            <th className="border px-3 py-2">Data</th>
                            <th className="border px-3 py-2">Tipologia</th>
                            <th className="border px-3 py-2 w-28">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transazioni.map((t) => (
                            <tr key={t.id} >
                                <td className="border px-3 py-2">{t.descrizione || "-"}</td>
                                <td className="border px-3 py-2">{t.importo.toFixed(2)} €</td>
                                <td className="border px-3 py-2">
                                    {t.data_riferimento
                                        ? new Date(t.data_riferimento).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td className="border px-3 py-2">{t.tipologia_spesa || "-"}</td>
                                <td className="border px-3 py-2">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => modifyTransaction(t.id!)}>
                                            <FaPen />
                                        </button>
                                        <button className="px-3 py-3 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteTransaction(t.id!)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
