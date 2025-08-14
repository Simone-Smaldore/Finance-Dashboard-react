import { useState } from 'react'
import { login } from '../../services/authService'
import { AxiosError } from 'axios'

interface LoginProps {
    onLoginSuccess: () => void
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            console.log("Login success")
            onLoginSuccess();
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err["response"]["data"]["error"]);
                } else {
                    setError("Errore di comunicazione con il Server")
                }
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default Login
