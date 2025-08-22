// api.ts
import axios from "axios";




let activeRequests = 0;
let setLoading: ((loading: boolean) => void) | null = null;
let getCsrfToken: (() => string | null) | null = null;

export const setGlobalLoadingHandler = (fn: (loading: boolean) => void) => {
    setLoading = fn;
};

export const setCsrfTokenGetter = (fn: () => string | null) => {
    getCsrfToken = fn;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    let csrfToken: string | null = null;

    if (getCsrfToken) {
        csrfToken = getCsrfToken();
    }


    if (csrfToken && config.method !== "get") {
        config.headers!["X-CSRF-TOKEN"] = csrfToken;
    }

    return config;
});


// Request interceptor
api.interceptors.request.use((config) => {
    activeRequests++;
    if (setLoading) setLoading(true);
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        activeRequests--;
        if (activeRequests === 0 && setLoading) setLoading(false);
        return response;
    },
    (error) => {
        activeRequests--;
        if (activeRequests === 0 && setLoading) setLoading(false);
        return Promise.reject(error);
    }
);

export default api;
