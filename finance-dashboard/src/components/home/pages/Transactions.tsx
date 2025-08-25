import { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa6";
import {
    useDeleteTransazione,
    useTransazioni,
    useCreateTransazione,
    useUpdateTransazione,
} from "../../../hoooks/hook_transazioni";
import ConfirmModal from "../../modals/ConfirmModal";
import FullscreenSpinner from "../../FullScreenSpinner";
import FormModal from "../../modals/FormModal";
import TransactionForm from "../../forms/TransactionForm";
import type { Transazione } from "../../../model/Transazione";

export default function Transactions() {
    const { data: transazioni = [], isLoading, isError } = useTransazioni();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");

    const [showFormModal, setShowFormModal] = useState(false);
    const [editingTransazione, setEditingTransazione] = useState<Transazione | null>(null);

    const deleteMutation = useDeleteTransazione();
    const createMutation = useCreateTransazione();
    const updateMutation = useUpdateTransazione();

    function handleDelete(id: number) {
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

    function handleEdit(t: Transazione) {
        if (t.data_riferimento) {
            t.data_riferimento = new Date(t.data_riferimento).toISOString().split("T")[0];
        }

        setEditingTransazione(t);
        setShowFormModal(true);
    }

    function handleCreate() {
        setEditingTransazione(null);
        setShowFormModal(true);
    }

    function handleSubmit(values: Transazione) {
        // setShowFormModal(false);
        if (values.id) {
            // Update
            const { id, ...updates } = values;
            updateMutation.mutate(
                { id, updates },
                {
                    onError: (err) => {
                        console.error("Errore aggiornamento:", err);
                        alert("Errore durante l'aggiornamento");
                    },
                    onSettled: () => {
                        setShowFormModal(false);
                        setEditingTransazione(null);
                    },
                }
            );
        } else {
            // Create
            // Per ora usiamo id_conto fisso o puoi aggiungerlo dinamico
            //TODO AGGIUNGERE ID CONTO 
            createMutation.mutate(
                { id_conto: 1, transazione: values },
                {
                    onError: (err) => {
                        console.error("Errore creazione:", err);
                        alert("Errore durante la creazione");
                    },
                    onSettled: () => setShowFormModal(false),
                }
            );
        }
    }

    if (isLoading) return <FullscreenSpinner />;
    if (isError) return <p className="p-4 text-red-600">Errore nel recupero delle transazioni</p>;

    return (
        <div className="p-6">
            <button
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleCreate}
            >
                <FaPlus className="inline mr-2" />
                Nuova Transazione
            </button>

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
                            <tr key={t.id}>
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
                                        <button
                                            className="px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
                                            onClick={() => handleEdit(t)}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="px-3 py-3 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
                                            onClick={() => handleDelete(t.id!)}
                                        >
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

            <FormModal<Transazione>
                isOpen={showFormModal}
                title={editingTransazione ? "Modifica Transazione" : "Nuova Transazione"}
                initialValues={
                    editingTransazione ?? {
                        id: undefined,
                        descrizione: "",
                        importo: 0,
                        data_riferimento: new Date().toISOString(),
                        tipologia_spesa: "",
                    }
                }
                onSubmit={handleSubmit}
                onCancel={() => setShowFormModal(false)}
                renderFields={(values, setValues, setIsValid) => (
                    <TransactionForm values={values} setValues={setValues} setIsValid={setIsValid} />
                )}
            />
        </div>
    );
}
