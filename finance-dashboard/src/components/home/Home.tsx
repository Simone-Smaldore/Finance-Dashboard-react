import { styled } from "styled-components"
import PrivateRoute from "../../PrivateRoute"
import Sidebar, { type Page } from "./Sidebar"
import Header from "./Header"
import MainPanel from "./MainPanel"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService"

const Layout = styled.div<{ menuOpen: boolean }>`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;

  @media (max-width: 800px) {
    grid-template-columns: ${({ menuOpen }) => (menuOpen ? "250px 1fr" : "1fr")};
    transition: grid-template-columns 0.3s ease;
  }
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
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Errore durante il logout", err);
        }
    };

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return <PrivateRoute>
        {(user) => (
            <Layout menuOpen={menuOpen}>
                <Sidebar
                    onToggleTheme={onToggleTheme}
                    currentTheme={theme}
                    onChangePage={(page) => {
                        setCurrentPage(page)
                        if (menuOpen) setMenuOpen(false) // chiudi il menu su mobile
                    }}
                    currentPage={currentPage}
                    menuOpen={menuOpen}
                />
                <MainContent>
                    <Header
                        userName={user.nome_completo}
                        onLogout={handleLogout}
                        onBurgerClick={toggleMenu}   // nuovo prop
                        currentPage={currentPage}    // mostra pagina su mobile
                        menuOpen={menuOpen}
                    />
                    <MainPanel currentPage={currentPage} />
                </MainContent>
            </Layout>
        )}
    </PrivateRoute>
}

export default Home
