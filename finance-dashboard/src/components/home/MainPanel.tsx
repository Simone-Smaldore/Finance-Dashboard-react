import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import type { Page } from "./Sidebar"

interface MainPanelProps {
    currentPage: Page
}
const MainPanel: React.FC<MainPanelProps> = ({ currentPage }) => {
    return (
        <>
            {currentPage === 'Dashboard' ? <Dashboard /> : <Transactions />}
        </>
    )
}


export default MainPanel