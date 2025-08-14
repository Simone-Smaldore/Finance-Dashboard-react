import { styled } from "styled-components"
import PrivateRoute from "../../PrivateRoute"
import Sidebar from "../Sidebar"
import Header from "../Header"

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
interface DashboardProps {
    onToggleTheme: () => void,
    theme: "dark" | "light"
}

const Dashboard: React.FC<DashboardProps> = ({ onToggleTheme, theme }) => {
    return <PrivateRoute>
        <Layout>
            <Sidebar onToggleTheme={onToggleTheme} currentTheme={theme} />
            <MainContent>
                <Header userName="Simone Smaldore" />
            </MainContent>
        </Layout>
    </PrivateRoute>
}

export default Dashboard
