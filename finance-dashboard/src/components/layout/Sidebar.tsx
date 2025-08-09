import React from 'react';
import styled from '@emotion/styled';
import { FaTachometerAlt, FaWallet, FaChartBar, FaEnvelope, FaExchangeAlt, FaUsers, FaCog, FaBell, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.sidebarBg};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background-color 0.25s linear;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent};
  text-align: center;
  margin-bottom: 3rem;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.accentLight}33;
  }

  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`;

const ThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.accentLight}33;
  }
`;

const menuItems = [
  { icon: <FaTachometerAlt />, name: 'Dashboard' },
  { icon: <FaWallet />, name: 'Wallet' },
  { icon: <FaChartBar />, name: 'Analytics' },
  { icon: <FaEnvelope />, name: 'Messages' },
  { icon: <FaExchangeAlt />, name: 'Transactions' },
  { icon: <FaUsers />, name: 'Customers' },
  { icon: <FaCog />, name: 'Settings' },
  { icon: <FaBell />, name: 'Notifications' },
  { icon: <FaSignOutAlt />, name: 'Sign out' },
];

interface SidebarProps {
    toggleTheme: () => void;
    isDarkTheme: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleTheme, isDarkTheme }) => {
  return (
    <SidebarContainer>
      <Logo>FinDash</Logo>
      <Menu>
        {menuItems.map(item => (
          <MenuItem key={item.name}>
            {item.icon}
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </Menu>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <FaSun /> : <FaMoon />}
        <span style={{ marginLeft: '0.5rem' }}>Switch Theme</span>
      </ThemeToggle>
    </SidebarContainer>
  );
};

export default Sidebar;
