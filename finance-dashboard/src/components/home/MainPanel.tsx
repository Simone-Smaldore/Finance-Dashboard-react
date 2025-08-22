import Accounts from "./pages/Accounts"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import type { Page } from "./Sidebar"

interface MainPanelProps {
    currentPage: Page
}
const MainPanel: React.FC<MainPanelProps> = ({ currentPage }) => {
    return (
        <>
            {(() => {
                switch (currentPage) {
                    case 'Dashboard':
                        return <Dashboard />;
                    case 'Transactions':
                        return <Transactions />;
                    case 'Accounts':
                        return <Accounts />;
                    default:
                        return <Dashboard />; // fallback
                }
            })()}
        </>
    )
}


export default MainPanel