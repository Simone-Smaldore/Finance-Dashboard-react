import styled from 'styled-components'
import ThemeToggle from '../ThemeToggle'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { FaExchangeAlt, FaTachometerAlt } from 'react-icons/fa'


const Container = styled.nav`
  background: ${({ theme }) => theme.cardBg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 2px 0 5px ${({ theme }) => theme.shadow};
`
const Logo = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
`

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const MenuItem = styled.li<{ selected?: boolean }>`
  margin-bottom: 1.25rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: ${({ selected }) => (selected ? "20px" : "0")};
  background-color: ${({ selected, theme }) => (selected ? theme.cardBglight : theme.cardBg)};
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`


const LogoText = styled.p`
    margin-left: 16px;
`

const Footer = styled.div`
  margin-top: auto;
`

interface SidebarProps {
    onToggleTheme: () => void
    currentTheme: 'dark' | 'light'
    onChangePage: (page: Page) => void
    currentPage: Page
}


const menuItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt /> },
    { label: 'Transactions', icon: <FaExchangeAlt /> },
];

export type Page = typeof menuItems[number]["label"]


const Sidebar: React.FC<SidebarProps> = ({ onToggleTheme, currentTheme, onChangePage, currentPage }) => {

    const onSelectedItem = (item: string) => {
        onChangePage(item)
    }
    return (
        <Container>
            <div>
                <Logo>
                    <FaMoneyBillWave />
                    <LogoText>Menu</LogoText>
                </Logo>
                <Menu>
                    {menuItems.map(({ label, icon }) => (
                        <MenuItem
                            key={label}
                            selected={currentPage === label}
                            onClick={() => onSelectedItem(label)}
                        >
                            {icon}
                            <span style={{ marginLeft: "16px", padding: "8px" }}>{label}</span>
                        </MenuItem>
                    ))}
                </Menu>
            </div>

            <Footer>
                <ThemeToggle
                    onToggleTheme={onToggleTheme}
                    currentTheme={currentTheme}
                />
            </Footer>
        </Container>
    )
}


export default Sidebar
