export interface ValidationErrorItem {
    campo: string;
    messaggio: string;
}

export interface ValidationErrorResponse {
    errors: ValidationErrorItem[];
}
