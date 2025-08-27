export interface Transazione {
    id?: number;
    descrizione?: string;
    importo: number;
    data_riferimento?: string;
    id_utente?: number;
    id_conto?: number;
    tipologia_spesa?: string;
    tipo_transazione: "Entrata" | "Uscita"
}
