import React, { useState, useEffect } from "react";
import { login } from "../../services/authService";
import { AxiosError } from "axios";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import bgImage from "../../assets/finance.jpeg";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Background = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${bgImage}) no-repeat center center/cover;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5); /* overlay scuro per contrasto */
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 40px 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  color: #fff;


  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  font-size: 1.7rem;
  text-align: center;
  margin-bottom: 8px;
`;


const ErrorMsg = styled.div`
  background: rgba(255, 0, 0, 0.15);
  color: #ffbaba;
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-size: 1rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;

    &::placeholder {
      color: #eee;
    }
  }
`;

const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
`;


const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 0.9rem;
`;

const Remember = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    appearance: none;          /* rimuove lo stile nativo */
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.primary};/* colore primary */
    border-radius: 6px;        /* arrotondamento */
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fff;
    transition: background 0.2s, border-color 0.2s;

    &:checked {
      background: ${({ theme }) => theme.primary};    /* colore primary quando selezionata */
      border-color: ${({ theme }) => theme.primary};
    }

    &:checked::after {
      content: "✓";
      color: #fff;
      font-size: 14px;
    }
  }
`;




const Button = styled.button`
  padding: 14px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconButton = styled.button`
  width:0;
  position: absolute;
  right: 30px;
  bottom: 12px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
`;

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("remembered_username");
    if (stored) setUsername(stored);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username.trim().toLowerCase(), password);
      if (remember) {
        localStorage.setItem("remembered_username", username.trim());
      } else {
        localStorage.removeItem("remembered_username");
      }

      onLoginSuccess();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || "Credenziali non valide");
      } else {
        setError("Errore di comunicazione con il server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Card>
        <Title>Login</Title>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="password">Password</label>
            <PasswordWrapper>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <IconButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </PasswordWrapper>
          </InputGroup>

          <Footer>
            <Remember>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Ricordami
            </Remember>
          </Footer>

          <Button type="submit" disabled={loading}>
            {loading ? "Accesso in corso..." : "Accedi"}
          </Button>
        </Form>


      </Card>
    </Background>
  );
};

export default Login;
