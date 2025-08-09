import React from 'react';
import styled from '@emotion/styled';
import { FaSearch } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.body};
`;

const WelcomeMessage = styled.div`
  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 400;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.text}99;
    @media (max-width: 992px) {
      display: none;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: 2rem;

  input {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.text}33;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    width: 250px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.accent};
    }
    @media (max-width: 992px) {
      width: 180px;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text}99;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 500;
    @media (max-width: 992px) {
      display: none;
    }
  }
`;


const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <WelcomeMessage>
        <h2>Hello, Kristi</h2>
        <p>welcome back</p>
      </WelcomeMessage>
      <HeaderRight>
        <SearchContainer>
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </SearchContainer>
        <UserProfile>
          <img src="https://i.pravatar.cc/40" alt="User Avatar" />
          <span>Kristi Kamlykova</span>
        </UserProfile>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
