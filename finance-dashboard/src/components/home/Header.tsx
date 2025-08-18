import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.header`
  margin-top: 8px;
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;
  position: relative;
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
  background: ${({ theme }) => theme.accent};
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
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Chiudi il dropdown cliccando fuori
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
      <UserInfo onClick={() => setOpen(!open)}>
        <Avatar>{initials}</Avatar>
        <UserName>{userName}</UserName>
      </UserInfo>
      <DropdownMenu open={open}>
        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
      </DropdownMenu>
    </Container>
  );
};

export default Header;
