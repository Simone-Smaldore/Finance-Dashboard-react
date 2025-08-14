import axios from "axios";


export async function login(username: string, password: string) {
    console.log(import.meta.env.VITE_API_URL)

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
