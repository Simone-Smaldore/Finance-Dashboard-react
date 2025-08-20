import axios from "axios";
import type { User } from "../model/User";


export async function login(username: string, password: string) {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );
    return res;
}


export async function getCurrentUser(): Promise<User> {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        withCredentials: true,
    });
    return res.data;
}

export async function logout() {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
    );
    return res;
}