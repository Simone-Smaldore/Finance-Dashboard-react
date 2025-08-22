import { createContext, useContext } from "react";

export const LoadingContext = createContext<boolean>(false);

export function useGlobalLoading() {
    return useContext(LoadingContext);
}
