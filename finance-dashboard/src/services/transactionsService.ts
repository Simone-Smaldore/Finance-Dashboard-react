import axios from "axios";
import type { Transazione } from "../model/Transazione";


export const getTransazioni = async (): Promise<Transazione[]> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/transazioni_uscite`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error("Errore fetch transazioni:", err);
        throw err;
    }
};
