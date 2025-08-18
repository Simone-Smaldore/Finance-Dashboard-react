import { styled } from "styled-components"
import PrivateRoute from "../../PrivateRoute"
import Sidebar, { type Page } from "./Sidebar"
import Header from "./Header"
import MainPanel from "./MainPanel"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService"

const Layout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
`

const MainContent = styled.main`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`
interface HomeProps {
    onToggleTheme: () => void,
    theme: "dark" | "light"
}

const Home: React.FC<HomeProps> = ({ onToggleTheme, theme }) => {
    const [currentPage, setCurrentPage] = useState<Page>("Dashboard")
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Errore durante il logout", err);
        }
    };


    return <PrivateRoute>
        {(user) => (
            <Layout>
                <Sidebar
                    onToggleTheme={onToggleTheme}
                    currentTheme={theme}
                    onChangePage={setCurrentPage}
                    currentPage={currentPage}
                />
                <MainContent>
                    <Header userName={user.nome_completo} onLogout={handleLogout} />
                    <MainPanel currentPage={currentPage} />
                </MainContent>
            </Layout>
        )}
    </PrivateRoute>

}

export default Home
