import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
  margin-top: 8px;
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;

`


const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

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
`

const UserName = styled.span`
  font-weight: 600;
  font-size: 1rem;
`

interface HeaderProps {
    userName: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
        <Container>
            <UserInfo>
                <Avatar>{initials}</Avatar>
                <UserName>{userName}</UserName>
            </UserInfo>
        </Container>
        // <Container>
        //     <Avatar>{initials}</Avatar>
        //     <UserName>{userName}</UserName>
        // </Container>
    )
}

export default Header
