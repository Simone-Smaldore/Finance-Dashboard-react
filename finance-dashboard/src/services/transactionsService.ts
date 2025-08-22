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