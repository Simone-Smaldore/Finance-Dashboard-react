import type { Transazione } from "../model/Transazione";
import api from "./api";


export const getTransazioni = async (): Promise<Transazione[]> => {
    try {
        const response = await api.get(`/transazioni_uscite`);
        return response.data;
    } catch (err) {
        console.error("Errore fetch transazioni:", err);
        throw err;
    }
};

export const deleteTransazione = async (id: number): Promise<void> => {
    try {
        await api.delete(`/transazioni_uscite/${id}`);
    } catch (err) {
        console.error("Errore eliminazione transazione:", err);
        throw err;
    }
};


export const createTransazione = async (
    id_conto: number,
    transazione: Transazione
): Promise<Transazione> => {
    try {
        const response = await api.post(`/transazioni_uscite`, {
            id_conto,
            transazione,
        });
        return response.data;
    } catch (err) {
        console.error("Errore creazione transazione:", err);
        throw err;
    }
};

// UPDATE transazione esistente
export const updateTransazione = async (
    id: number,
    updates: Transazione
): Promise<Transazione> => {
    try {
        const response = await api.put(`/transazioni_uscite/${id}`, { "transazione": updates });
        return response.data;
    } catch (err) {
        console.error("Errore aggiornamento transazione:", err);
        throw err;
    }
};