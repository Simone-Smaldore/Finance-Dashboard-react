import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.header`
  margin-top: 8px;
  margin-right: 16px;
  display: flex;
  justify-content: space-between; /* burger a sinistra, utente a destra */
  align-items: center;
  position: relative;
  padding: 0 16px;
`;

const LeftSection = styled.div<{ menuOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 800px) {
    display: ${({ menuOpen }) => (menuOpen ? "none" : "flex")};
  }
`;

const Burger = styled.span`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
    margin-right: 8px;
  }
`;

const PageTitle = styled.span`
  display: none;
  font-weight: bold;
  font-size: 1rem;

  @media (max-width: 800px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 1rem;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  @media (max-width: 800px) {
      display: none;
  }
`;

const DropdownMenu = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 150px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

interface HeaderProps {
  userName: string;
  onLogout: () => void;
  onBurgerClick?: () => void;
  currentPage?: string;
  menuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout, onBurgerClick, currentPage, menuOpen }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={ref}>
      <LeftSection menuOpen={menuOpen}>
        {onBurgerClick && <Burger onClick={onBurgerClick}>☰</Burger>}
        <PageTitle>{currentPage}</PageTitle>
      </LeftSection>

      <UserInfo onClick={() => setOpen(!open)}>
        <Avatar>{initials}</Avatar>
        <UserName>{userName}</UserName>
        <DropdownMenu open={open}>
          <DropdownItem onClick={onLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </UserInfo>
    </Container>
  );
};

export default Header;
