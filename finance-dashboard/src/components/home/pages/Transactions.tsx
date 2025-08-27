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
import type { AxiosError } from "axios";
import type { ValidationErrorResponse } from "../../../model/Validators";

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
                    onError: (err: unknown) => {
                        console.log(err)
                        const axiosErr = err as AxiosError<ValidationErrorResponse>;

                        if (axiosErr.response?.data?.errors) {
                            const messaggi = axiosErr.response.data.errors.join("\n");
                            alert("Errori di validazione:\n" + messaggi);
                        } else {
                            alert("Errore durante l'operazione");
                        }
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
                    onError: (err: unknown) => {
                        console.log(err)
                        const axiosErr = err as AxiosError<ValidationErrorResponse>;

                        if (axiosErr.response?.data?.errors) {
                            const messaggi = axiosErr.response.data.errors.join("\n");
                            alert("Errori di validazione:\n" + messaggi);
                        } else {
                            alert("Errore durante l'operazione");
                        }
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
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 hover:cursor-pointer"
                onClick={handleCreate}
            >
                <FaPlus className="inline mr-2" />
                Nuova Transazione
            </button>

            <div className="overflow-x-auto shadow-lg rounded-xs">
                <table className="hidden md:table min-w-full border text-sm text-left">
                    <thead className="bg-neon-purple text-white">
                        <tr>
                            <th className="border px-3 py-2">Descrizione</th>
                            <th className="border px-3 py-2">Importo</th>
                            <th className="border px-3 py-2">Data</th>
                            <th className="border px-3 py-2">Categporia</th>
                            <th className="border px-3 py-2">Tipo</th>
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
                                <td className="border px-3 py-2 "><p
                                    className={`mt-2 font-semibold ${t.tipo_transazione === "Uscita" ? "text-red-500" : "text-green-500"
                                        }`}
                                >
                                    {t.tipo_transazione || "-"}
                                </p></td>
                                <td className="border px-3 py-2">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-3 bg-neon-blue text-white rounded hover:bg-neon-blue-hover hover:cursor-pointer" onClick={() => handleEdit(t)}>
                                            <FaPen />
                                        </button>
                                        <button className="px-3 py-3 bg-neon-pink text-white rounded hover:bg-neon-pink-hover hover:cursor-pointer" onClick={() => handleDelete(t.id!)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Versione mobile a card */}
                <div className="md:hidden  grid grid-cols-1 xs:grid-cols-2 gap-2">
                    {transazioni.map((t) => (
                        <div
                            key={t.id}
                            className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between"
                        >
                            {/* Tipologia */}
                            <h3 className="font-bold text-black text-md text-center mb-5">
                                {t.descrizione || "-"}
                            </h3>

                            {/* Data */}
                            <div className="flex align-middle items-center justify-between">
                                <p className="text-xs text-gray-500 mt-1">
                                    {t.data_riferimento
                                        ? new Date(t.data_riferimento).toLocaleDateString()
                                        : "-"}
                                </p>
                                {/* Descrizione */}
                                <p
                                    className={`mt-2 font-semibold ${t.tipo_transazione === "Uscita" ? "text-red-500" : "text-green-500"
                                        }`}
                                >
                                    {t.tipo_transazione || "-"}
                                </p>
                            </div>

                            {/* Descrizione */}
                            <p className="mt-2 text-gray-800">{t.tipologia_spesa || "-"}</p>



                            {/* Prezzo */}
                            <p className="mt-5 font-bold text-neon-purple-hover text-xl">
                                {t.importo.toFixed(2)} €
                            </p>

                            {/* Azioni */}
                            <div className="flex justify-end gap-2 mt-4">
                                <button className="px-3 py-2 bg-neon-blue text-white rounded-2xl hover:bg-neon-blue-hover shadow hover:cursor-pointer" onClick={() => handleEdit(t)}>
                                    <FaPen />
                                </button>
                                <button className="px-3 py-2 bg-neon-pink text-white rounded-2xl hover:bg-neon-pink-hover shadow hover:cursor-pointer" onClick={() => handleDelete(t.id!)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

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
                        importo: 0.01,
                        data_riferimento: new Date().toISOString(),
                        tipologia_spesa: "",
                        tipo_transazione: "Uscita"
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
