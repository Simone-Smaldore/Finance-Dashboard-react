import React from 'react'
import styled from 'styled-components'
import ThemeToggle from './ThemeToggle'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { FaCog, FaExchangeAlt, FaTachometerAlt, FaWallet } from 'react-icons/fa'


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

const MenuItem = styled.li`
  margin-bottom: 1.25rem;
  cursor: pointer;
  padding-left: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size:1.2rem;

  &:hover {
    color: ${({ theme }) => theme.accent};
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
}

const menuItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt /> },
    { label: 'Wallet', icon: <FaWallet /> },
    { label: 'Transactions', icon: <FaExchangeAlt /> },
    { label: 'Settings', icon: <FaCog /> },
];

const Sidebar: React.FC<SidebarProps> = ({ onToggleTheme, currentTheme }) => {
    return (
        <Container>
            <div>
                <Logo>
                    <FaMoneyBillWave />
                    <LogoText>Menu</LogoText>
                </Logo>
                <Menu>
                    {menuItems.map(({ label, icon }) => (
                        <MenuItem key={label}>
                            {icon}
                            <span style={{ marginLeft: '16px' }}>{label}</span>
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
