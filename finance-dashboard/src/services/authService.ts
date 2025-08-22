import type { User } from "../model/User";
import api from "./api";


export async function login(username: string, password: string) {
    const res = await api.post(
        `/login`,
        { username, password },
        {
            headers: { "Content-Type": "application/json" },
        }
    );
    return res;
}


export async function getCurrentUser(): Promise<User> {
    const res = await api.get(`/me`,);
    return res.data;
}

export async function logout() {
    const res = await api.post(`/logout`);
    return res;
}