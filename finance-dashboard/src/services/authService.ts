import axios from "axios";


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
