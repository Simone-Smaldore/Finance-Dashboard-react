import type { Transazione } from "../../../model/Transazione";
import { FaPen, FaTrash } from "react-icons/fa6";
import { queryClient } from "../../../main";
import { useDeleteTransazione, useTransazioni } from "../../../hoooks/hook_transazioni";
import { useState } from "react";
import ConfirmModal from "../../modals/ConfirmModal";
import FullscreenSpinner from "../../FullScreenSpinner";



function modifyTransaction(id: number) {
    const transazioni = queryClient.getQueryData<Transazione[]>(["transazioni"]) ?? [];
    console.log(transazioni.filter((t: Transazione) => t.id === id))
}

export default function Transactions() {

    const { data: transazioni = [], isLoading, isError } = useTransazioni();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [showEditModal, setShowEditModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const deleteMutation = useDeleteTransazione();



    function handleDelete(id: number) {
        const transazioni = queryClient.getQueryData<Transazione[]>(["transazioni"]) ?? [];
        const t = transazioni.find(tr => tr.id === id);

        if (t) {
            setSelectedId(id);
            setShowDeleteModal(true);
            setDeleteMessage(`Vuoi davvero eliminare la transazione: "${t.descrizione}" di importo ${t.importo}€ ?`);
        }
    }

    function confirmDelete() {
        if (!selectedId) return;

        deleteMutation.mutate(selectedId, {
            onError: (err) => {
                console.error("Errore eliminazione:", err);
                alert("Errore durante l'eliminazione della transazione");
            },
            onSettled: () => {
                setShowDeleteModal(false);
                setSelectedId(null);
            },
        });
    }

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
                                        <button className="px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer" onClick={() => modifyTransaction(t.id!)}>
                                            <FaPen />
                                        </button>
                                        <button className="px-3 py-3 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer" onClick={() => handleDelete(t.id!)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Conferma eliminazione"
                message={deleteMessage}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
